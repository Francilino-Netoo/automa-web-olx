import React from "react";
import { Navigate } from "react-router-dom";
import { isLogged } from "../helpers/authHandler";

export default function PrivateRoute({ element }) {
  const logged = isLogged();

  return logged ? element : <Navigate to="/signin" replace />;
}
