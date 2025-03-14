import React from "react";
import { Link } from "react-router-dom";
import { Item } from "./styled";

const AdItem = ({ data }) => {
  if (!data) return null;

  // Adiciona a URL completa caso esteja faltando
  const imageUrl = data.image.startsWith("http")
    ? data.image
    : `https://back-and-api-basica.onrender.com/media/${data.image}`;

  const price = data.priceNegotiable ? "Preço negociável" : `R$ ${data.price}`;

  return (
    <Item>
      <Link to={`/ad/${data.id}`}>
        <div className="itemImage">
          <img src={imageUrl} alt={data.title || "Anúncio"} />
        </div>
        <div className="itemName">{data.title || "Sem título"}</div>
        <div className="itemPrice">{price}</div>
      </Link>
    </Item>
  );
};

export default AdItem;
