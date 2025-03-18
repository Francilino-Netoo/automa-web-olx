import React, { useEffect, useState, useRef } from "react";
import { PageArea } from "./styles";
import { PageContainer } from "../../components/MainComponets";
import OlxApi from "../../helpers/OlxApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const Page = () => {
  const api = OlxApi();
  const navigate = useNavigate();
  const fileField = useRef();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingAd, setEditingAd] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        let token = Cookies.get("token");
        if (!token) {
          setError("Usuário não autenticado.");
          setLoading(false);
          return;
        }

        const profileData = await api.getProfile(token);
        console.log("Todos os dados ", profileData);
        if (profileData.error) {
          throw new Error(profileData.error);
        }

        setUserData(profileData);
      } catch (err) {
        setError(err.message || "Erro ao carregar dados do perfil.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [api]);

  const handleEditClick = (ad) => {
    setEditingAd(ad);
    setNewImage(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };
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

  const handleSaveChanges = async () => {
    if (!editingAd) return;

    const fData = new FormData();

    fData.append("title", editingAd.title || "");
    fData.append("cat", editingAd?.category || editingAd?._doc?.category || "");
    fData.append("status", editingAd.status ? "true" : "false");
    fData.append("priceneg", editingAd.priceNegotiable ? "true" : "false");
    fData.append("desc", editingAd.description || "");
    fData.append("price", isNaN(editingAd.price) ? "0" : editingAd.price);

    console.log("Dados enviados:", Object.fromEntries(fData.entries()));

    if (fileField.current?.files?.length > 0) {
      for (let i = 0; i < fileField.current.files.length; i++) {
        const file = fileField.current.files[i];

        if (file.type === "image/webp") {
          try {
            const convertedFile = await convertWebPtoPNG(file);
            fData.append("img", convertedFile, convertedFile.name);
          } catch (error) {
            console.error("Erro ao converter WebP para PNG:", error);
            alert("Erro ao processar imagem WebP.");
            return;
          }
        } else {
          fData.append("img", file);
        }
      }
    }

    try {
      await api.updateAds(editingAd._id, fData);
      alert("Anúncio atualizado com sucesso!");
      setEditingAd(null);
    } catch (error) {
      console.error("Erro ao atualizar anúncio:", error);
      alert("Erro ao atualizar anúncio.");
    }
  };

  const getImageUrl = (image) => {
    let imageUrl = image || "placeholder.jpg";

    if (
      imageUrl.startsWith(
        "https://back-and-api-basica.onrender.com/media/https"
      )
    ) {
      imageUrl = imageUrl.replace(
        "https://back-and-api-basica.onrender.com/media/",
        ""
      );
    } else if (!imageUrl.startsWith("http")) {
      imageUrl = `https://back-and-api-basica.onrender.com/media/${imageUrl}`;
    }

    return imageUrl;
  };

  return (
    <PageContainer>
      <PageArea>
        {editingAd && (
          <div className="modal">
            <div className="modal-content">
              <h2>Editar Anúncio</h2>

              <label>Título:</label>
              <input
                type="text"
                value={editingAd.title}
                onChange={(e) =>
                  setEditingAd({ ...editingAd, title: e.target.value })
                }
              />

              <label>Preço:</label>
              <input
                type="text"
                value={editingAd.price}
                onChange={(e) =>
                  setEditingAd({ ...editingAd, price: e.target.value })
                }
              />
              <label>Preço Negociável?:</label>
              <input
                type="checkbox"
                checked={!!editingAd.priceNegotiable}
                onChange={(e) => {
                  const updatedValue = e.target.checked;
                  setEditingAd((prev) => ({
                    ...prev,
                    priceNegotiable: updatedValue,
                  }));
                }}
              />

              <label>Ativar Anúncio:</label>
              <input
                type="checkbox"
                checked={!!editingAd.status}
                onChange={(e) => {
                  const updatedValue = e.target.checked;
                  setEditingAd((prev) => ({
                    ...prev,
                    status: updatedValue,
                  }));
                }}
              />

              <label>Descrição:</label>
              <textarea
                value={editingAd.description}
                onChange={(e) =>
                  setEditingAd({ ...editingAd, description: e.target.value })
                }
              />

              <label>Imagem Atual:</label>
              <img
                src={
                  newImage
                    ? URL.createObjectURL(newImage)
                    : getImageUrl(editingAd?.images?.[0]?.url)
                }
                alt="Imagem Atual"
                className="previewImage"
              />

              <label>Nova Imagem:</label>
              <input
                type="file"
                ref={fileField}
                multiple
                onChange={handleImageChange}
              />

              <div className="modal-buttons">
                <button onClick={handleSaveChanges}>Salvar</button>
                <button onClick={() => setEditingAd(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        <div className="leftSide">
          <h2>Perfil do Usuário</h2>
          {loading && <p>Carregando...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {userData && (
            <div className="dataProfiler">
              <p>
                <strong>Nome:</strong> {userData.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Estado:</strong> {userData.state}
              </p>
              <button
                onClick={() => navigate("/user/me/edit")}
                className="editProfileButton"
              >
                Editar Perfil
              </button>
            </div>
          )}
        </div>

        <div className="rightSide">
          {userData?.ads?.length > 0 ? (
            <div className="adsSection">
              <h3>Meus Anúncios</h3>
              <div className="adsGrid">
                {userData.ads.map((ad, index) => {
                  let imageUrl = getImageUrl(ad._doc?.images?.[0]?.url);
                  return (
                    <div key={ad._id || `ad-${index}`} className="adItem">
                      <img src={imageUrl} alt={ad._doc?.title} />
                      <div className="adDetails">
                        <h4>{ad._doc?.title}</h4>
                        <p>
                          <strong>Preço:</strong> R$ {ad._doc?.price}
                        </p>
                        {/*<p>
                  <strong>Descrição:</strong> {ad._doc?.description}
                </p>*/}
                        <p>
                          <strong>Visualizações:</strong> {ad._doc?.views}
                        </p>
                      </div>
                      <button
                        className="editAdButton"
                        onClick={() => handleEditClick(ad._doc)}
                      >
                        <FaEdit /> Editar
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="noAdsMessage">
              <p>Você não possui anúncios</p>
            </div>
          )}
        </div>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
