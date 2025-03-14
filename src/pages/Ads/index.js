import React, { useEffect, useRef, useState } from "react";
import { PageArea } from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import { PageContainer } from "../../components/MainComponets";

import OlxApi from "../../helpers/OlxApi";

///import Swal from "sweetalert2";
//import { Link } from "react-router-dom";
import AdItem from "../../components/partial/AdItem";

const Page = () => {
  const api = OlxApi();

  const navigate = useNavigate();
  const timerRef = useRef(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [q, setQ] = useState(query.get("q") != null ? query.get("q") : "");
  const [cat, setCat] = useState(
    query.get("cat") != null ? query.get("cat") : ""
  );
  const [state, setState] = useState(
    query.get("state") != null ? query.get("state") : ""
  );

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);
  const [resuçtOpacity, setResultOpacity] = useState(1);
  const [loading, setLoading] = useState(true);

  const [adsTotal, setAdsTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const getAdsList = async () => {
    setLoading(true);

    let offset = (currentPage - 1) * 2;

    const json = await api.getAds({
      sort: "desc",
      limit: 2,
      q,
      cat,
      state,
      offset,
    });
    setAdList(json.ads);
    setAdsTotal(json.total);
    setResultOpacity(1);
    setLoading(false);
  };

  useEffect(() => {
    if (adsTotal > 0) {
      setPageCount(Math.ceil(adsTotal / 2)); // 2 é o limit definido no getAdsList
    } else {
      setPageCount(0);
    }
  }, [adsTotal]);

  useEffect(() => {
    setCurrentPage(1);

    let queryString = [];
    if (q) queryString.push(`q=${q}`);
    if (cat) queryString.push(`cat=${cat}`);
    if (state) queryString.push(`state=${state}`);

    navigate(`?${queryString.join("&")}`, { replace: true });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(getAdsList, 2000);
    setResultOpacity(0.3);
  }, [q, cat, state]);

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };
    getStates();
  }, [api]);
  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    getCategories();
  }, [api]);
  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: "desc",
        limit: 8,
      });
      setAdList(json.ads);
    };
    getRecentAds();
  }, [api]);

  useEffect(() => {
    setResultOpacity(0.3);
    getAdsList();
  }, [currentPage]);

  let pagination = [];
  for (let i = 1; i <= pageCount; i++) {
    pagination.push(i);
  }

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <form method="GET">
            <input
              type="text"
              name="q"
              placeholder="O que você procura?"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

            <div className="filterName">Estado:</div>
            <select
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option></option>
              {stateList.map((i, k) => (
                <option key={k} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>
            <div className="filterName">Categoria:</div>
            <ul>
              {categories.map((i, k) => (
                <li
                  key={k}
                  className={
                    cat === i._doc.slug ? "categoryItem active" : "categoryItem"
                  }
                  onClick={() => setCat(i._doc.slug)}
                >
                  <img src={i.img} alt="" />
                  <span>{i._doc.name}</span>
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div className="rightSide">
          <h2>Resultados</h2>
          {loading && adList.length === 0 && (
            <div className="listWarning">Carregando...</div>
          )}
          {!loading && adList.length === 0 && (
            <div className="listWarning">Não encontramos resultados.</div>
          )}

          <div className="list" style={{ opacity: resuçtOpacity }}>
            {adList.map((i, k) => {
              return <AdItem key={k} data={i} />;
            })}
          </div>

          {adList.length > 0 && (
            <div className="pagination">
              {pagination.map((i, k) => (
                <div
                  onClick={() => setCurrentPage(i)}
                  key={k}
                  className={i === currentPage ? "pageItem active" : "pageItem"}
                >
                  {i}
                </div>
              ))}
            </div>
          )}
        </div>
      </PageArea>
      <hr />
    </PageContainer>
  );
};

export default Page;
