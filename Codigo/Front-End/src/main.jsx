import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ezh5fo0wbr3xqlet.us.auth0.com"
      clientId="YJ54wBZ29zdXFssAInrneWPqXUwQ6sRr"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
