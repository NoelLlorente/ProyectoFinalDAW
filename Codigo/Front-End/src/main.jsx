import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

/**
 * @function main
 * @generator
 *
 * @description Acá es donde se llama al componente {@link App} que contiene todos los componentes, vista y providers, que vamos a renderizar.
 * Este componente es el corazón porque es donde se crea el document Root, osea todo el sitio web.
 * Se llama a un provider de JWT Auth0Provider pasandole el dominio, el clientId y la url de redirección.
 *
 */
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
