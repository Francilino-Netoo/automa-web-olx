import React from "react";
import { FooterArea } from "./styled";

const Footer = () => {
  return (
    <FooterArea>
      <div className="footer-content">
        <p>
          © {new Date().getFullYear()} Minha Loja. Todos os direitos reservados.
        </p>
        <p>Desenvolvido usando React.js, Node.js e MongoDB.</p>
        <p>
          Este site permite pesquisar, adicionar produtos e filtrar por
          categorias para uma melhor experiência de compra.
        </p>
        <p>Este é um projeto independente e não possui vínculo com a OLX.</p>
      </div>
    </FooterArea>
  );
};

export default Footer;
