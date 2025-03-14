import styled from "styled-components";

export const Item = styled.div`
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    text-decoration: none;
    color: #000;
    background-color: #fff;
    transition: all ease 0.3s;
    width: 180px;
    height: 240px;
    gap: 5px;

    &:hover {
      border: 1px solid #aaa;
      background-color: #f5f5f5;
    }
  }

  .itemImage {
    width: 100%;
    height: 140px;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .itemImage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  .itemName {
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 18px;
  }

  .itemPrice {
    color: #009688;
    font-weight: bold;
    text-align: center;
    min-height: 18px;
  }

  @media (max-width: 600px) {
    a {
      width: 150px;
      height: 220px;
    }

    .itemImage {
      height: 120px;
    }

    .itemName,
    .itemPrice {
      font-size: 12px;
    }
  }
`;
