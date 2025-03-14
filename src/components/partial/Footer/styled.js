import styled from "styled-components";

export const FooterArea = styled.footer`
  color: #000;
  text-align: center;
  padding: 20px 10px;
  margin-top: 30px;

  .footer-content {
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    margin-top: 10px;

    a {
      color: #1abc9c;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s;

      &:hover {
        color: #16a085;
      }
    }
  }

  @media (max-width: 600px) {
    padding: 15px 5px;

    p {
      font-size: 12px;
    }
  }
`;
