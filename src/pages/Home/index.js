import React, { useEffect, useState } from "react";
import { PageArea, SeacrchArea } from "./styles";

import { PageContainer } from "../../components/MainComponets";

import OlxApi from "../../helpers/OlxApi";

///import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import AdItem from "../../components/partial/AdItem";

const Page = () => {
  const api = OlxApi();

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

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

  return (
    <>
      <SeacrchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="GET" action="/ads">
              <input type="text" name="q" placeholder="O que você procura?" />
              <select name="state">
                {stateList.map((i, k) => (
                  <option key={k} value={i.name}>
                    {i.name}
                  </option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className="categoryList">
            {categories.map((i, K) => (
              <Link
                key={K}
                to={`/ads?cat=${i._doc.slug}`}
                className="categoryItem"
              >
                <img src={i.img} alt="" />
                <span>{i._doc.name}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </SeacrchArea>
      <PageContainer>
        <PageArea>
          <h2>Anúncios Recentes</h2>
          <div className="list">
            {adList.map((i, k) => (
              <AdItem key={k} data={i} />
            ))}
          </div>
          <Link to="/ads" className="seeAllLink">
            Ver Todos
          </Link>
          <hr />
        </PageArea>
      </PageContainer>
    </>
  );
};

export default Page;
