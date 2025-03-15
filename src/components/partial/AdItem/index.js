import React from "react";
import { Link } from "react-router-dom";
import { Item } from "./styled";

const AdItem = ({ data }) => {
  if (!data) return null;

  let imageUrl = data.image;

  if (imageUrl.includes("http://192.168.5.200:5000/media/https")) {
    imageUrl = imageUrl.replace("http://192.168.5.200:5000/media/", "");
  }

  if (!imageUrl || !imageUrl.startsWith("http")) {
    imageUrl = "https://via.placeholder.com/150";
  }

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
