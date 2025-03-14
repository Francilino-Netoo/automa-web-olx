import React, { useEffect, useState } from "react";
import { PageArea, Fake, OthersArea, BreadChumb } from "./styles";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Link, useParams } from "react-router-dom";

import { PageContainer } from "../../components/MainComponets";

import OlxApi from "../../helpers/OlxApi";

import Swal from "sweetalert2";
import AdItem from "../../components/partial/AdItem";

const Page = () => {
  const api = OlxApi();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState({});

  useEffect(() => {
    const getAdInfo = async (id) => {
      try {
        const json = await api.getAd(id, true);
        if (json) {
          setAdInfo(json);
          console.log(json);
        } else {
          Swal.fire("Erro!", "Anúncio não encontrado", "error");
        }
      } catch (error) {
        console.error("Erro ao buscar anúncio:", error);
        Swal.fire("Erro!", "Falha ao carregar os dados.", "error");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getAdInfo(id);
    }
  }, [id, api]);

  const formateDate = (date) => {
    let cDate = new Date(date);

    let months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];
    let cDay = cDate.getDate();
    let cMonth = cDate.getMonth();
    let cYear = cDate.getFullYear();

    return `${cDay} de ${months[cMonth]} de ${cYear}`;
  };

  return (
    <PageContainer>
      {adInfo.category && (
        <BreadChumb>
          Você esta aqui:
          <Link to="/">Home</Link>/
          <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>/
          <Link
            to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}
          >
            {adInfo.category.name}
          </Link>
          /<Link to="/">{adInfo.title}</Link>
        </BreadChumb>
      )}

      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adImage">
              {loading && <Fake height={300} />}
              {adInfo.images && (
                <Slide>
                  {adInfo.images.map((img, k) => (
                    <div key={k} className="each-slide">
                      <img src={img} alt="" />
                    </div>
                  ))}
                </Slide>
              )}
            </div>
            <div className="adInfo">
              <div className="adName">
                {loading && <Fake height={20} />}
                {adInfo.title && <h2>{adInfo.title}</h2>}
                {adInfo.dateCreated && (
                  <small>Criado em {formateDate(adInfo.dateCreated)}</small>
                )}
              </div>
              <div className="adDescription">
                {loading && <Fake height={100} />}
                {adInfo.description}
                <hr />
                {adInfo.views && <small>Visualizações: {adInfo.views}</small>}
              </div>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="box box-padding">
            {loading && <Fake height={20} />}
            {adInfo.priceNegotiable && "Preço negociável"}
            {!adInfo.priceNegotiable && adInfo.price && (
              <div className="price">
                Preço: <samp>R$ {adInfo.price}</samp>
              </div>
            )}
          </div>
          {loading && <Fake height={50} />}
          {adInfo.userInfo && (
            <>
              <a
                href={`Whatsapp: ${adInfo.userInfo.email}`}
                target="_blank"
                rel="noreferrer"
                className="contactSellerLink"
              >
                Fale com o vendedor
              </a>

              <div className="createdBy box box-padding">
                <strong>{adInfo.userInfo.name}</strong>
                <small>E-mail: {adInfo.userInfo.email}</small>
                <small>Estado: {adInfo.stateName}</small>
              </div>
            </>
          )}
        </div>
      </PageArea>

      <OthersArea>
        {adInfo.others && adInfo.others.length > 0 && (
          <>
            <h2>Outras ofertas do vendedor</h2>
            <div className="list">
              {adInfo.others.map((i, k) => (
                <AdItem key={k} data={i} />
              ))}
            </div>
          </>
        )}
      </OthersArea>
    </PageContainer>
  );
};

export default Page;
