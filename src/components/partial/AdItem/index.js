import React from "react";
import { Link } from "react-router-dom";
import { Item } from "./styled";

const AdItem = ({ data }) => {
  if (!data) return null;

  // Verifica e ajusta a URL da imagem, se necessário
  let imageUrl = data.image;
  if (
    imageUrl &&
    imageUrl.startsWith("https://back-and-api-basica.onrender.com/media/")
  ) {
    imageUrl = imageUrl.replace(
      "https://back-and-api-basica.onrender.com/media/",
      ""
    );
  }

  const price = data.priceNegotiable ? "Preço negociável" : `R$ ${data.price}`;

  return (
    <Item>
      <Link to={`/ad/${data.id}`}>
        <div className="itemImage">
          <img
            src={imageUrl || "/default-image.jpg"}
            alt={data.title || "Anúncio"}
          />
        </div>
        <div className="itemName">{data.title || "Sem título"}</div>
        <div className="itemPrice">{price}</div>
      </Link>
    </Item>
  );
};

export default AdItem;
