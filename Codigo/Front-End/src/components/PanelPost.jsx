/* eslint-disable react/prop-types */
import estilos from "../styles/panelPosts.module.css";
/**
 * Este componente mostrará los datos del post, tanto del que se crea como del que se hace click en el sidebar.
 *
 * @function PanelPost
 * @memberof Blog
 * @prop {Object} post Es un objeto que contiene los datos del post.
 * @returns {JSX.Element} Se retorna el componente.
 */
export const PanelPost = ({ post }) => {
  /**
   * Se convierte de string a fecha y hora.
   */
  const fecha = new Date(post.fecha);
  /**
   * Se formatea la fecha, osea solo se obtiene la fecha en vez de fecha y hora.
   */
  const fechaFormateada = fecha.toISOString().split("T")[0];

  return (
    <div className={`container ${estilos.contenedor_panelPost}`}>
      <h4>{post.usuario}</h4>
      <p>{post.descripcion}</p>
      <p>{fechaFormateada}</p>
    </div>
  );
};
