import video from "../assets/video/AI_video.mp4";
import "../styles/headerHome.css";

export const Header = () => {
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
          <button type="button" className="btn btn-primary">
            REGISTRARSE
          </button>
          <button type="button" className="btn btn-outline-light">
            VER MÁS
          </button>
        </div>
      </div>
    </div>
  );
};
