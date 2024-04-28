/* eslint-disable react/prop-types */
import estilos from "../styles/sidebarPost.module.css";
import { BiArrowFromRight } from "react-icons/bi";
import { EntradaPost } from "./EntradaPost";
export const SidebarBlog = ({
  showSidebar,
  setShowSidebar,
  setDisplayBtn,
  widthSurpassed,
  handlePostClick,
  listaPostsUsuario,
  eliminarPost,
  setMostrarPost,
  eliminarPosts,
  handleModificarPost,
  setPostAModificar,
  setMostrarTodosPosts,
}) => {
  const handleClickMenuBtn = () => {
    setShowSidebar(false);
    setDisplayBtn(true);
  };

  const handleClickCrear = () => {
    setMostrarPost(false);
    setMostrarTodosPosts(false);
    setPostAModificar(null);
  };

  const handleClickMostrarTodos = () => {
    setMostrarTodosPosts(true);
  };

  const handleClickEliminarTodos = () => {
    eliminarPosts();
  };

  return (
    <div
      className={`${estilos.contenedor_sidebar} ${
        showSidebar ? estilos.abierto : estilos.cerrado
      }`}
      id="contenedor_sidebar"
    >
      {widthSurpassed && (
        <button
          className={`${estilos.btn_cerrarSidebar}`}
          onClick={handleClickMenuBtn}
        >
          <BiArrowFromRight />
        </button>
      )}
      <h2>Blog</h2>
      <div className={estilos.botones}>
        <button className={`btn btn-primary`} onClick={handleClickCrear}>
          Crear
        </button>
        <button className={`btn btn-danger`} onClick={handleClickEliminarTodos}>
          Eliminar Todos
        </button>
      </div>
      <div className={estilos.consultas}>
        <button className={`btn btn-info`} onClick={handleClickMostrarTodos}>
          Mostrar Todos
        </button>
        {listaPostsUsuario &&
          listaPostsUsuario.length > 0 &&
          listaPostsUsuario.map((post, index) => (
            <EntradaPost
              key={index}
              descripcion={post.descripcion}
              onClick={() => handlePostClick(post)}
              eliminarPost={() => eliminarPost(post.id)}
              handleModificarPost={() => handleModificarPost(post)}
            />
          ))}
      </div>
    </div>
  );
};
