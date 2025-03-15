import styled from "styled-components";

export const PageArea = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;

  .leftSide {
    width: 300px;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;

    h2 {
      font-size: 18px;
      margin-bottom: 15px;
      color: #333;
    }

    .dataProfiler {
      font-size: 16px;
      line-height: 1.6;

      p {
        margin: 10px 0;
        strong {
          color: #007bff;
        }
      }
      .editProfileButton {
        margin-top: 15px;
        padding: 8px 15px;
        font-size: 14px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;

        &:hover {
          background-color: #0056b3;
        }
      }
    }
  }

  .rightSide {
    flex: 1;
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: auto;

    h2 {
      font-size: 18px;
      margin-bottom: 15px;
      color: #333;
    }

    .adsSection {
      flex: 1;
      overflow-y: auto;
      max-height: 300px;
      padding-right: 10px;

      h3 {
        font-size: 16px;
        margin-bottom: 10px;
      }

      .adsGrid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 15px;
      }

      .adItem {
        background: #fff;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        transition: background-color 0.3s ease-in-out; /* Adicionando transição suave */

        &:hover {
          background: #f0f0f0; /* Mudança de cor ao passar o mouse */
          cursor: pointer;
        }

        img {
          width: 100%;
          max-width: 150px;
          height: 100px;
          object-fit: cover;
          border-radius: 5px;
        }

        .adDetails {
          margin-top: 8px;

          h4 {
            font-size: 14px;
            margin-bottom: 5px;
          }

          p {
            font-size: 12px;
            margin: 2px 0;
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;

    .leftSide,
    .rightSide {
      width: 100%;
      padding: 15px;
      margin: 5px 0;
    }

    .adsSection {
      max-height: 250px;
    }

    .adsGrid {
      grid-template-columns: 1fr;
    }
  }
`;
