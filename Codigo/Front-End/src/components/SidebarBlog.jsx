/* eslint-disable react/prop-types */
import estilos from "../styles/sidebarPost.module.css";
import { BiArrowFromRight } from "react-icons/bi";
import { EntradaPost } from "./EntradaPost";

/**
 * Este componente es el sidebar de la vista Blog, basicamente aca tendremos 3 botones, uno para crear, otro para eliminar todos los posts,
 * otro para mostrar todos los posts, y por ultimos se mostrarán los posts que tengamos.
 *
 * @function SidebarBlog
 * @memberof Blog
 * @prop {boolean} showSidebar Es un booleano que nos indica si se muestra la sidebar o no.
 * @prop {setter} setShowSidebar Es un setter que se utiliza para cambiar el estado de showSidebar.
 * @prop {setter} setDisplayBtn Es un setter que se utiliza para cambiar el estado de displayBtn.
 * @prop {boolean} widthSurpassed Es un booleano que nos indica si se ha superado el tamaño de la pantalla indicado.
 * @prop {function} handlePostClick Es una función que viene del padre Blog.jsx, que maneja cuando hagamos click en un post.
 * @prop {Object[]} listaPostsUsuario Es una array de objetos que contiene los posts de el usuario logueado.
 * @prop {function} eliminarPost Es una función que nos permite eliminar tanto del provider como de la db un post. Viene del provider PostProvider.
 * @prop {setter} setMostrarPost Es un setter que nos permite cambiar el estado de mostratPost.
 * @prop {function} eliminarPosts Es una función que nos permite eliminar tanto del provider como de la db todos los post. Viene del provider PostProvider.
 * @prop {function} handleModificarPost Es una función que como su nombre indica maneja que cuando hagamos click en el botón modificar de un post, realizar ciertas acciones.
 * @prop {setter} setPostAModificar Es un setter que nos permite cambiar el estado de postAModificar.
 * @prop {setter} setMostrarTodosPosts Es un setter que nos permite cambiar el estado de mostrarTodosPosts.
 * @returns {JSX.Element} Se retorna el componente.
 */
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
  /**
   * Es una función que maneja que cuando hagamos click en el botón de ocultar sidebar, este se ocultará.
   *
   * @function SidebarBlog_handleClickMenuBtn
   * @returns {None} No retorna nada.
   */
  const handleClickMenuBtn = () => {
    setShowSidebar(false);
    setDisplayBtn(true);
  };

  /**
   * Es una función que maneja el evento del click en el botón Crear.
   *
   * @function SidebarBlog_handleClickCrear
   * @returns {None} No retorna nada.
   */
  const handleClickCrear = () => {
    setMostrarPost(false);
    setMostrarTodosPosts(false);
    setPostAModificar(null);
  };

  /**
   * Es una función que maneja el click en el botón de mostrar todos.
   *
   * @function SidebarBlog_handleClickMostrarTodos
   * @returns {None} No retorna nada.
   */
  const handleClickMostrarTodos = () => {
    setMostrarTodosPosts(true);
  };

  /**
   * Es una función que se utiliza para manejar el click en el botón de eliminar todos.
   * Como se puede apreciar se hace uso de la función eliminarPosts del Provider.
   *
   * @function SidebarBlog_handleClickEliminarTodos
   * @returns {None} No retorna nada.
   */
  const handleClickEliminarTodos = () => {
    eliminarPosts();
  };

  /**
   * Se retorna el componente. Si tenemos posts dentro de listaPostsUsuario entonces se crearán entradas de cada post (EntradaPost)
   */
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
