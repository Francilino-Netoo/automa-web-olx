import React from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

import Routs from "./Routs";
import { Template } from "./components/MainComponets";
import Header from "./components/partial/Header";
import Footer from "./components/partial/Footer";

const Page = (props) => {
  return (
    <BrowserRouter>
      <Template>
        <Header />

        <Routs />

        <Footer />
      </Template>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Page);
