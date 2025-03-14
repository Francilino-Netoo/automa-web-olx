import Cookies from "js-cookie";

export const isLogged = () => {
  let token = Cookies.get("token");
  return token ? true : false;
};

export const doLogin = (token, renemberPassword = false) => {
  if (renemberPassword) {
    Cookies.set("token", token, { expires: 999 });
  } else {
    Cookies.set("token", token);
  }
};

export const doLogout = () => {
  Cookies.remove("token");
};
