import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageArea } from "./styles";
import { PageContainer } from "../../components/MainComponets";
import OlxApi from "../../helpers/OlxApi";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const EditProfile = () => {
  const api = OlxApi();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    state: query.get("state") || "",
  });

  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        let token = Cookies.get("token");
        if (!token) {
          setError("Usuário não autenticado.");
          setLoading(false);
          return;
        }

        const profileData = await api.getProfile(token);
        if (profileData.error) {
          throw new Error(profileData.error);
        }

        setUserData((prev) => ({
          ...prev,
          name: profileData.name,
          email: profileData.email,
          state: profileData.state || "",
        }));
      } catch (err) {
        setError(err.message || "Erro ao carregar dados do perfil.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [api]);

  useEffect(() => {
    const getStates = async () => {
      try {
        const slist = await api.getStates();
        if (slist && Array.isArray(slist)) {
          setStateList(slist);
        } else {
          console.error("Erro ao carregar estados: Resposta inválida", slist);
        }
      } catch (error) {
        console.error("Erro ao buscar estados:", error);
      }
    };
    getStates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.updateProfile(
        userData.name,
        userData.email,
        userData.password,
        userData.state
      );

      if (response.error) {
        throw new Error(response.error);
      }

      Swal.fire({
        icon: "success",
        text: "Perfil atualizado com sucesso!",
        confirmButtonText: "Ok",
        customClass: {
          popup: "custom-swal",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm",
        },
      });

      navigate("/user/me");
    } catch (err) {
      setError(err.message || "Erro ao atualizar o perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageArea>
        <h2>Editar Perfil</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              required
            />
          </label>
          <label>
            Nova Senha:
            <input
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </label>

          <label>
            Estado:
            <select
              name="state"
              value={userData.state}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, state: e.target.value }))
              }
            >
              <option value="">Selecione um estado</option>
              {stateList.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default EditProfile;
