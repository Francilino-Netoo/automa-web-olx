import React, { useState, useEffect } from "react";
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [stateLoc, setStateLoc] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisable] = useState(false);
  const [error, setError] = useState("");
  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };
    getStates();
  }, [api]); // Adicionando api ao array de dependências

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisable(true);

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        text: "Senhas estão diferentes",
        confirmButtonText: "Entendido",
        customClass: {
          popup: "custom-swal",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm",
        },
      });
    }

    const json = await api.register(name, email, password, stateLoc);

    if (json.error) {
      setError("");
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
      doLogin(json.token);
      window.location.href = "/";
    }
  };

  return (
    <PageContainer>
      <PageTitle>Cadastro</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area-title">Nome Completo</div>
            <div className="area-input">
              <input
                type="name"
                disabled={disabled}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className="area-title">Estado</div>
            <div className="area-input">
              <select
                required
                value={stateLoc}
                onChange={(e) => setStateLoc(e.target.value)}
              >
                <option></option>
                {stateList.map((i, k) => (
                  <option key={k} value={i._id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
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
            <div className="area-title">Confirmar Senha</div>
            <div className="area-input">
              <input
                type="password"
                disabled={disabled}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area-title"></div>
            <div className="area-input">
              <button disabled={disabled}>Fazer Cadastro</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
