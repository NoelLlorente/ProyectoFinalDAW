import { Link } from "react-router-dom";
import video from "../assets/video/AI_video.mp4";
import "../styles/headerHome.css";

export const HeaderHome = () => {
  return (
    <div className="container-fluid contenedor">
      <video loop autoPlay muted className="contenedor_video container-fluid">
        <source src={video} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      <div className="container-md contenedor_titulo">
        <h1>THE BUSSINESS JOURNEY</h1>
        <h3>LA INTELIGENCIA QUE IMPULSA NEGOCIOS: AVANZA CON IA.</h3>
        <div className="botones_header">
          <Link to="/register" className="btn btn-primary">
            REGISTRARSE
          </Link>
          <Link to="/sobre-nosotros" className="btn btn-outline-light ver_mas">
            VER MÁS
          </Link>
        </div>
      </div>
    </div>
  );
};
