import React, { useEffect, useState } from "react";
import { PageArea } from "./styles";
import { PageContainer } from "../../components/MainComponets";
import OlxApi from "../../helpers/OlxApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const api = OlxApi();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
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

        const profileData = await api.getProfile(token); // Chama a API
        if (profileData.error) {
          throw new Error(profileData.error);
        }

        setUserData(profileData);
      } catch (err) {
        setError(err.message || "Erro ao carregar dados do perfil.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [api]);

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <h2>Perfil do Usuário</h2>
          {loading && <p>Carregando...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {userData && (
            <div className="dataProfiler">
              <p>
                <strong>Nome:</strong> {userData.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Estado:</strong> {userData.state}
              </p>
              <button
                onClick={() => navigate("/user/me/edit")}
                className="editProfileButton"
              >
                Editar Perfil
              </button>
            </div>
          )}
        </div>

        <div className="rightSide">
          {userData?.ads?.length > 0 && (
            <div className="adsSection">
              <h3>Meus Anúncios</h3>
              <div className="adsGrid">
                {userData.ads.map((ad, index) => {
                  let imageUrl = ad._doc?.images?.[0]?.url || "placeholder.jpg";

                  if (
                    imageUrl.startsWith(
                      "https://back-and-api-basica.onrender.com/media/https"
                    )
                  ) {
                    imageUrl = imageUrl.replace(
                      "https://back-and-api-basica.onrender.com/media/",
                      ""
                    );
                  } else if (!imageUrl.startsWith("http")) {
                    imageUrl = `https://back-and-api-basica.onrender.com/media/${imageUrl}`;
                  }

                  return (
                    <div key={index} className="adItem">
                      <img src={imageUrl} alt={ad._doc?.title} />
                      <div className="adDetails">
                        <h4>{ad._doc?.title}</h4>
                        <p>
                          <strong>Preço:</strong> R$ {ad._doc?.price}
                        </p>
                        <p>
                          <strong>Descrição:</strong> {ad._doc?.description}
                        </p>
                        <p>
                          <strong>Visualizações:</strong> {ad._doc?.views}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </PageArea>
    </PageContainer>
  );
};

export default Page;
