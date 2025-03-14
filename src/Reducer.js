import { createStore } from "redux";
import userReducer from "./reducers/userReducer"; // Importação correta

const store = createStore(userReducer);

export default store;
