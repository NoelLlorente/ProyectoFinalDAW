/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import estilos from "../styles/blog.module.css";
import { MdMenu } from "react-icons/md";
import { SidebarBlog } from "../components/SidebarBlog";
import { PostContext } from "../context/PostContext";
import { PanelPost } from "../components/PanelPost";
import { FormPosts } from "../components/FormPosts";

/**
 * Este componente es la vista del Blog, donde se crean los posts.
 * Acá se utiliza el provider PostProvider que contiene las funcionalidades de crear, eliminar, cargar, etc.
 * También se llaman a distintos componentes como son el sidebarBlog, el FormPost y el PanelPost.
 *
 * @namespace Blog
 * @returns {JSX.Element} Se retorna el componente.
 */
export const Blog = () => {
  /**
   * Se crean los useState(Estados), para manejar distintas funcionalidades.
   */
  const [displayBtn, setDisplayBtn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [mostrarPost, setMostrarPost] = useState(false);
  const [post, setPost] = useState(null);
  const [postAModificar, setPostAModificar] = useState(null);
  const [mostrarTodosPosts, setMostrarTodosPosts] = useState(true);
  const [widthSurpassed, setWidthSurpassed] = useState(
    window.innerWidth < 1870
  );

  /**
   * No traemos las funcionalidades del provider.
   */
  const {
    listaPosts,
    listaPostsUsuario,
    agregarPost,
    eliminarPost,
    modificarPost,
    eliminarPosts,
  } = useContext(PostContext);

  /**
   * Esta función manejará que cuando hagamos click en un post del sidebar, se muestre correctamente.
   * Acá también cuando hacemos click en un post, obtenemos sus datos.
   *
   * @param {Object} post Es el objeto que contiene los datos del post
   * @returns {None} No devuelve nada.
   */
  const handlePostClick = (post) => {
    setMostrarTodosPosts(false);
    setPost(post);
    setPostAModificar(null);
    setMostrarPost(true);
  };

  /**
   * Se maneja que cuando hagamos click en el botón modificar de un post en el sidebar,
   * obtengamos sus datos y se cambien algunos estados.
   *
   * @param {Object} post Es el objeto que contiene los datos del post
   * @returns {None} No devuelve nada.
   */
  const handleModificarPost = (post) => {
    setMostrarTodosPosts(false);
    setPost(null);
    setMostrarPost(false);
    setPostAModificar(post);
  };

  /**
   * Se utiliza cuando hacemos click en el botón que despliega el sidebar, este también se utiliza para ocultar el sidebar.
   * @returns {None} No retorna nada
   */
  const handleSidebarClick = () => {
    setShowSidebar(true);
    setDisplayBtn(false);
  };

  /**
   * Se utiliza el useEffect para manejar cuando ocultar la sidebar según el tamaño de la ventana y cuando ocultarla.
   * Además de cuando mostrar el botón y cuando ocultarlo
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1870) {
        setWidthSurpassed(true);
        setDisplayBtn(true);
        setShowSidebar(false);
      } else {
        setWidthSurpassed(false);
        setDisplayBtn(false);
        setShowSidebar(true);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * Se retorna el componente. Como se puede apreciar, se muestra los componentes, algunos se muestrán si un estado(useState) tiene unas características, ejemplo este en True.
   */
  return (
    <div className={`container-fluid ${estilos.contenedor_blog}`}>
      {displayBtn && (
        <button
          className={`btn btn-primary ${estilos.btn_abrirSidebar}`}
          onClick={handleSidebarClick}
        >
          <MdMenu />
        </button>
      )}
      <SidebarBlog
        showSidebar={showSidebar}
        widthSurpassed={widthSurpassed}
        setDisplayBtn={setDisplayBtn}
        setShowSidebar={setShowSidebar}
        handlePostClick={handlePostClick}
        listaPostsUsuario={listaPostsUsuario}
        eliminarPost={eliminarPost}
        setMostrarPost={setMostrarPost}
        eliminarPosts={eliminarPosts}
        setMostrarTodosPosts={setMostrarTodosPosts}
        handleModificarPost={handleModificarPost}
        setPostAModificar={setPostAModificar}
      />
      <main className={estilos.main}>
        {mostrarTodosPosts && listaPosts && (
          <div className={`container ${estilos.contenedor_todosPosts}`}>
            {listaPosts.map((post) => (
              <PanelPost key={post.id} post={post} />
            ))}
          </div>
        )}

        {!mostrarPost && postAModificar && !mostrarTodosPosts && (
          <FormPosts
            agregarPost={agregarPost}
            setMostrarPost={setMostrarPost}
            setPost={setPost}
            postAModificar={postAModificar}
            modificarPost={modificarPost}
          />
        )}

        {!mostrarPost && !postAModificar && !mostrarTodosPosts && (
          <FormPosts
            agregarPost={agregarPost}
            setMostrarPost={setMostrarPost}
            setPost={setPost}
            postAModificar={postAModificar}
            modificarPost={modificarPost}
          />
        )}

        {post &&
          mostrarPost &&
          !mostrarTodosPosts &&
          (() => {
            const posts = listaPostsUsuario.find((p) => p.id === post.id);
            return posts && <PanelPost post={posts} />;
          })()}
      </main>
    </div>
  );
};
