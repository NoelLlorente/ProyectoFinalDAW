import img_innovacion from "../assets/img/img_innovacion.jpg";
import img_seguridad from "../assets/img/img_seguridad.jpg";
import "../styles/compromisoHome.css";

/**
 * Este es el componente Compromiso que se mostrará en Home, básicame en este componente indicamos a lo me comprometo.
 * @function Compromiso
 * @memberof Home
 * @returns {JSX.Element} El componente renderizado
 */
export const Compromiso = () => {
  return (
    <div className="container-fluid contenedor_compromiso">
      <div className="compromiso_titulo">
        <h3>NUESTRO COMPROMISO</h3>
        <p>INNOVACIÓN Y CONFIDENCIALIDAD EN CADA PASO</p>
      </div>
      <div className="compromiso_bloques">
        <div className="compromiso_bloques_card">
          <img src={img_innovacion} alt="imagen innovación" />
          <h5>CÓMO FUNCIONA NUESTRO SERVICIO</h5>
          <p>
            Descubre el proceso paso a paso que transformará tu idea en un plan
            de negocio viable. Nuestra plataforma utiliza algoritmos avanzados
            para guiarte en cada etapa, desde la conceptualización hasta la
            planificación financiera y la evaluación de riesgos.
          </p>
        </div>
        <div className="compromiso_bloques_card">
          <img src={img_seguridad} alt="imagen seguridad" />
          <h5>TU PRIVACIDAD ES NUESTRA PRIORIDAD</h5>
          <p>
            Nos comprometemos a proteger tu información personal y tus ideas de
            negocio. Todos los datos que compartes con nosotros se manejan con
            la más estricta confidencialidad y se utilizan exclusivamente para
            personalizar tu experiencia y mejorar la calidad de nuestro
            servicio.
          </p>
        </div>
      </div>
    </div>
  );
};
