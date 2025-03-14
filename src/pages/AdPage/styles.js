import styled from "styled-components";
import "react-slideshow-image/dist/styles.css";

export const Fake = styled.div`
  background-color: #ddd;
  height: ${(props) => props.height || 20}px;
`;

export const PageArea = styled.div`
  display: flex;
  margin-top: 20px;

  .box {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 4px #999;
    margin-bottom: 20px;
  }
  .box-padding {
    padding: 10px;
  }

  .leftSide {
    flex: 1;
    margin-right: 20px;

    .box {
      display: flex;
    }

    .adImage {
      width: 320px;
      min-height: 320px;
      margin-right: 20px;

      .each-slide img {
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: cover;
        height: 320px;
      }
    }

    .adInfo {
      flex: 1;
      .adName {
        margin-bottom: 20px;
        h2 {
          margin-top: 20px;
        }
        small {
          color: #999;
        }
      }
      .adDescription {
        small {
          color: #999;
        }
      }
    }
  }

  .rightSide {
    width: 250px;

    .price span {
      color: #0000ff;
      display: block;
      font-size: 27px;
      font-weight: bold;
    }
    .contactSellerLink {
      background-color: #0000ff;
      color: #fff;
      height: 30px;
      border-radius: 5px;
      box-shadow: 0px 0px 4px #999;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      margin-bottom: 20px;
    }
    .createdBy strong {
      display: block;
    }
    .createdBy small {
      display: block;
      color: #999;
      margin-top: 10px;
    }
  }

  @media (max-width: 600px) {
    & {
      flex-direction: column;
    }

    .leftSide {
      margin: 0;
      .box {
        flex-direction: column;
        width: 320px;
        margin: auto;
      }
      .adInfo {
        padding: 10px;
      }
    }

    .rightSide {
      width: auto;
      margin-top: 20px;
      .box {
        flex-direction: column;
        width: 320px;
        margin: auto;
      }

      .contactSellerLink {
        width: 320px;
        margin: 20px auto;
      }
    }
  }
`;

export const OthersArea = styled.div`
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .list {
    display: flex;
    overflow-x: auto;
    gap: 10px;
    padding-bottom: 10px;
    white-space: nowrap;
    scroll-behavior: smooth;
  }

  .adItem {
    width: 180px;
    height: 220px;
    flex-shrink: 0;
    text-align: center;
    background: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
  }

  .adItem img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-radius: 5px;
  }

  .itemName {
    font-weight: bold;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .itemPrice {
    color: #009688;
    font-weight: bold;
    font-size: 14px;
  }

  @media (max-width: 600px) {
    .adItem {
      width: 150px;
      height: 200px;
    }

    .adItem img {
      height: 120px;
    }

    .itemName,
    .itemPrice {
      font-size: 12px;
    }
  }
`;

export const BreadChumb = styled.div`
  font-size: 13px;
  margin-top: 20px;

  a {
    display: inline-block;
    margin: 0 5px;
    text-decoration: underline;
    color: #000;
  }

  @media (max-width: 600px) {
    & {
      margin: 20px;
    }
  }
`;
