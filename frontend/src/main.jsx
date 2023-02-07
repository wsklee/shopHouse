import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import { GlobalModal } from "./components/shared/modal/GlobalModal";
import { GlobalToast } from "./components/shared/toast/GlobalToast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalModal />
      <GlobalToast />
      <App />
    </BrowserRouter>
  </Provider>
);
