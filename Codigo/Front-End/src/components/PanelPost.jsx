/* eslint-disable react/prop-types */
import estilos from "../styles/panelPosts.module.css";
export const PanelPost = ({ post }) => {
  const fecha = new Date(post.fecha);
  const fechaFormateada = fecha.toISOString().split("T")[0];
  console.log(post);
  return (
    <div className={`container ${estilos.contenedor_panelPost}`}>
      <h4>{post.usuario}</h4>
      <p>{post.descripcion}</p>
      <p>{fechaFormateada}</p>
    </div>
  );
};
