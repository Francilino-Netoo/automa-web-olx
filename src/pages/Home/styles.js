import styled from "styled-components";

export const SeacrchArea = styled.div`
  background-color: #ddd;
  border-bottom: 1px solid #ccc;
  padding: 20px 0;

  .searchBox {
    background-color: #9bb83c;
    padding: 20px 15px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 0.3px rgba(0, 0, 0, 0.3);
    display: flex;

    form {
      flex: 1;
      display: flex;

      input,
      select {
        height: 40px;
        border: 0;
        border-radius: 5px;
        outline: 0;
        font-size: 15px;
        color: #000;
        margin-right: 20px;
      }
      input {
        flex: 1;
        padding: 0 10px;
      }
      select {
        width: 100px;
      }
      button {
        background-color: #49aeef;
        font-size: 15px;
        border: 0;
        border-radius: 5px;
        color: #fff;
        height: 40px;
        padding: 0 20px;
        cursor: pointer;
      }
    }
  }
  .categoryList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .categoryItem {
      width: 25%;
      display: flex;
      align-items: center;
      color: #000;
      text-decoration: none;
      height: 50px;
      margin-bottom: 10px;

      &:hover {
        color: #999;
      }

      img {
        width: 45px;
        height: 45px;
        margin-right: 10px;
      }
    }
  }
  @media (max-width: 600px) {
    .searchBox form {
      flex-direction: column;

      input {
        padding: 10px;
        margin-right: 0;
        margin-bottom: 10px;
      }

      select {
        width: 100%;
        margin-bottom: 10px;
      }
    }

    .categoryList .categoryItem {
      width: 50%;
      padding: 10px;
    }
  }
`;

export const PageArea = styled.div`
  h2 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    width: 100%;
  }

  .aditem {
    width: calc(20% - 10px);
    max-width: 160px;
    background: #fff;
    border-radius: 5px;
    padding: 8px;
    box-shadow: 0px 0px 5px #ccc;
    text-align: center;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }

    img {
      width: 100%;
      height: auto;
      max-height: 120px;
      object-fit: cover;
      border-radius: 5px;
    }

    .itemName {
      font-size: 13px;
      font-weight: bold;
      margin-top: 5px;
      text-align: center;
      word-break: break-word;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .itemPrice {
      font-size: 12px;
      color: #007bff;
      margin-top: 3px;
    }
  }

  .seeAllLink {
    color: #000;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    margin-top: 10px;
  }

  @media (max-width: 600px) {
    h2 {
      margin: 10px;
    }
    .list .aditem {
      width: 100%;
      gap: 0;
    }
  }
`;
