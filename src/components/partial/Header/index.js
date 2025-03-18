import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { HeaderArea, Sidebar } from "./styled";
import { isLogged, doLogout } from "../../../helpers/authHandler";

const Header = () => {
  let logged = isLogged();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 600);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    doLogout();
    window.location.href = "/";
  };

  return (
    <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="logo-1">O</span>
            <span className="logo-2">L</span>
            <span className="logo-3">X</span>
          </Link>
        </div>

        {isMobile && (
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        )}

        {isMobile && (
          <Sidebar ref={menuRef} className={menuOpen ? "open" : ""}>
            <button className="close-button" onClick={() => setMenuOpen(false)}>
              ✖
            </button>
            <ul>
              {logged ? (
                <>
                  <li>
                    <Link to="/user/me" onClick={() => setMenuOpen(false)}>
                      Minha Conta
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/post-an-ad"
                      className="button"
                      onClick={() => setMenuOpen(false)}
                    >
                      Poste um anúncio
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Sair</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/signin"
                      className={
                        location.pathname === "/signin" ? "active" : ""
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className={
                        location.pathname === "/signup" ? "active" : ""
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Cadastrar
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </Sidebar>
        )}

        {!isMobile && (
          <nav>
            <ul>
              {logged ? (
                <>
                  <li>
                    <Link to="/user/me">Minha Conta</Link>
                  </li>
                  <li>
                    <Link to="/post-an-ad" className="button">
                      Poste um anúncio
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Sair</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/signin"
                      className={
                        location.pathname === "/signin" ? "active" : ""
                      }
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className={
                        location.pathname === "/signup" ? "active" : ""
                      }
                    >
                      Cadastrar
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </HeaderArea>
  );
};

export default Header;
