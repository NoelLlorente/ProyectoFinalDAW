/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import video from "../assets/video/AI_video.mp4";
import "../styles/headerHome.css";
import { LoginButton } from "./LoginButton";

/**
 * Este componente es el header de la página Home.
 * Aca se llama al componente LoginButton que nos llevará al formulario de login de JWT.
 * @function HeaderHome
 * @memberof Home
 * @prop {boolean} isAuthenticated - Valida que el usuario está autenticado
 * @returns {JSX.Element} El componente renderizado
 */
export const HeaderHome = ({ isAuthenticated }) => {
  return (
    <div className="container-fluid contenedor">
      <video loop autoPlay muted className="contenedor_video container-fluid">
        <source src={video} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      <div className="container-md contenedor_titulo">
        <h1>THE BUSINESS JOURNEY</h1>
        <h3>LA INTELIGENCIA QUE IMPULSA NEGOCIOS: AVANZA CON IA.</h3>
        <div className="botones_header">
          {!isAuthenticated ? <LoginButton texto="Sign Up" /> : null}
          <Link to="/sobre-nosotros" className="btn btn-outline-light ver_mas">
            VER MÁS
          </Link>
        </div>
      </div>
    </div>
  );
};
