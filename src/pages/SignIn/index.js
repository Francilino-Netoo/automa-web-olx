import React, { useState } from "react";
import { PageArea } from "./styles";

import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponets";

import OlxApi from "../../helpers/OlxApi";

import { doLogin } from "../../helpers/authHandler";
import Swal from "sweetalert2";

const Page = () => {
  const api = OlxApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [renemberPassword, setRenemberPassword] = useState("");
  const [disabled, setDisable] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisable(true);

    const json = await api.login(email, password);

    if (json.error) {
      setError();
      setDisable(false);
      Swal.fire({
        icon: "warning",
        text: json.error,
        confirmButtonText: "Entendido",
        customClass: {
          popup: "custom-swal",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm",
        },
      });
    } else {
      doLogin(json.token, renemberPassword);
      window.location.href = "/";
    }
  };

  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area-title">E-mail</div>
            <div className="area-input">
              <input
                type="email"
                disabled={disabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area-title">Senha</div>
            <div className="area-input">
              <input
                type="password"
                disabled={disabled}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area-title">Lembrar Senha</div>
            <div className="area-input">
              <input
                type="checkbox"
                disabled={disabled}
                checked={renemberPassword}
                onChange={() => setRenemberPassword(!renemberPassword)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area-title"></div>
            <div className="area-input">
              <button disabled={disabled}>Fazer Login</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
