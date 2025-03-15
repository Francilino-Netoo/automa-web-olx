import styled from "styled-components";

export const HeaderArea = styled.div`
  background-color: #fff;
  height: 60px;
  border-bottom: 1px solid #ccc;

  .container {
    max-width: 1000px;
    margin: auto;
    display: flex;
  }
  a {
    text-decoration: none;
  }
  .logo {
    flex: 1;
    display: flex;
    align-items: center;

    .logo-1,
    .logo-2,
    .logo-3 {
      font-size: 27px;
      font-weight: bold;
    }
    .logo-1 {
      color: #ff0000;
    }
    .logo-2 {
      color: #00ff00;
    }
    .logo-3 {
      color: #0000ff;
    }
  }
  nav a {
    text-decoration: none;
    color: black;
    padding: 5px 10px;
    transition: color 0.3s ease;
  }
  nav a.active {
    color: blue;
    font-weight: bold;
  }
  nav {
    padding-top: 10px;
    padding-bottom: 10px;

    ul,
    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    ul {
      display: flex;
      align-items: center;
      height: 40px;
    }
    li {
      margin-left: 20px;
      margin-right: 20px;

      a,
      button {
        border: 0;
        background: none;
        color: #000;
        font-size: 14px;
        text-decoration: none;
        cursor: pointer;
        outline: 0;

        &:hover {
          color: #999;
        }

        &.button {
          background-color: #ff8100;
          border-radius: 4px;
          color: #fff;
          padding: 5px 10px;
        }
        &.button:hover {
          background-color: #e57706;
        }
      }
    }
  }

  @media (max-width: 600px) {
    height: auto;

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      justify-content: left;
      margin: 10px 10px;
    }

    nav ul {
      display: flex;
      padding: 0;
      margin: 0;
      list-style: none;
    }

    nav li {
      display: flex;
      align-items: center;
      margin-right: 0;
    }
    nav a {
      text-decoration: none;
      color: black;
      transition: color 0.3s ease;
    }
    nav a.active {
      color: blue;
      font-weight: bold;
    }
  }
`;

export const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100vh;
  background: #999;
  color: white;
  padding: 20px;
  transition: left 0.3s ease;
  z-index: 1000;

  &.open {
    left: 0;
  }

  .close-button {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }

  li {
    list-style: none;
    margin: 10px 0; /* Adiciona espaçamento entre os itens */
    padding: 5px 0;
  }

  nav a {
    text-decoration: none;
    color: white;
    font-size: 18px;
    display: block;
  }

  nav a:hover {
    color: #ff8100;
  }

  @media (min-width: 600px) {
    display: none;
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: block;

  @media (min-width: 600px) {
    display: none;
  }
`;
