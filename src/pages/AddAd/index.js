import React, { useEffect, useRef, useState } from "react";
import { PageArea } from "./styles";
import { useNavigate } from "react-router-dom";

import { NumericFormat } from "react-number-format";

import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponets";

import OlxApi from "../../helpers/OlxApi";
import Swal from "sweetalert2";

const Page = () => {
  const api = OlxApi();

  const fileField = useRef();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [desc, setDesc] = useState("");

  const [disabled, setDisable] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const cats = await api.getCategories();
        console.log("Categorias carregadas:", cats);
        setCategories(cats);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    getCategories();
  }, []);

  const convertWebPtoPNG = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          canvas.toBlob((blob) => {
            if (blob) {
              const newFile = new File(
                [blob],
                file.name.replace(".webp", ".png"),
                {
                  type: "image/png",
                  lastModified: Date.now(),
                }
              );
              resolve(newFile);
            } else {
              reject(new Error("Erro ao converter imagem"));
            }
          }, "image/png");
        };
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    setError("");

    let errors = [];

    if (!title.trim()) {
      errors.push("Sem título");
    }
    if (!category) {
      errors.push("Sem categoria");
    }

    if (errors.length === 0) {
      const fData = new FormData();
      fData.append("title", title);
      fData.append("price", price);
      fData.append("priceneg", priceNegotiable);
      fData.append("desc", desc);
      fData.append("cat", category);

      if (fileField.current.files.length > 0) {
        for (let i = 0; i < fileField.current.files.length; i++) {
          const file = fileField.current.files[i];

          if (file.type === "image/webp") {
            // Converter WebP para PNG antes de enviar
            const convertedFile = await convertWebPtoPNG(file);
            fData.append("img", convertedFile, convertedFile.name);
          } else {
            fData.append("img", file);
          }
        }
      }

      const json = await api.addAd(fData);

      if (!json.error) {
        navigate(`/ad/${json.id}`);
        return;
      } else {
        setError(json.error);
      }
    } else {
      setError(errors.join("\n"));
      Swal.fire({
        icon: "warning",
        text: errors.join("\n"),
        confirmButtonText: "Entendido",
        customClass: {
          popup: "custom-swal",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm",
        },
      });
    }

    setDisable(false);
  };

  return (
    <PageContainer>
      <PageTitle>Postar um Anúncio</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area-title">Titulo</div>
            <div className="area-input">
              <input
                type="text"
                disabled={disabled}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area-title">Categoria</div>
            <div className="area-input">
              <select
                disabled={disabled}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option></option>
                {categories &&
                  categories.map((i, index) => (
                    <option
                      key={i._doc?._id || index}
                      value={i._doc?._id || ""}
                    >
                      {i._doc?.name || "Sem nome"}
                    </option>
                  ))}
              </select>
            </div>
          </label>
          <label className="area">
            <div className="area-title">Preço</div>
            <div className="area-input">
              <NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                allowNegative={false}
                disabled={disabled || priceNegotiable}
                value={price}
                onValueChange={(values) => setPrice(values.value)}
                placeholder="R$ 0,00"
              />
            </div>
          </label>
          <label className="area">
            <div className="area-title">Preço Negociável</div>
            <div className="area-input">
              <input
                type="checkbox"
                disabled={disabled}
                checked={priceNegotiable}
                onChange={(e) => setPriceNegotiable(!priceNegotiable)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area-title">Descrição</div>
            <div className="area-input">
              <textarea
                disabled={disabled}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
          </label>
          <label className="area">
            <div className="area-title">Imagens (1 ou mais )</div>
            <div className="area-input">
              <input disabled={disabled} type="file" multiple ref={fileField} />
            </div>
          </label>
          <label className="area">
            <div className="area-title"></div>
            <div className="area-input">
              <button disabled={disabled}>Adiciona Anúncio </button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
