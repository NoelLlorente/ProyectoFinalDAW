/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import estilos from "../styles/blog.module.css";
import { MdMenu } from "react-icons/md";
import { SidebarBlog } from "../components/SidebarBlog";
import { PostContext } from "../context/PostContext";
import { PanelPost } from "../components/PanelPost";
import { FormPosts } from "../components/FormPosts";
export const Blog = () => {
  const [displayBtn, setDisplayBtn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [mostrarPost, setMostrarPost] = useState(false);
  const [post, setPost] = useState(null);
  const [postAModificar, setPostAModificar] = useState(null);
  const [mostrarTodosPosts, setMostrarTodosPosts] = useState(true);
  const [widthSurpassed, setWidthSurpassed] = useState(
    window.innerWidth < 1870
  );

  const {
    listaPosts,
    listaPostsUsuario,
    agregarPost,
    eliminarPost,
    modificarPost,
    eliminarPosts,
  } = useContext(PostContext);

  console.log(listaPostsUsuario);
  const handlePostClick = (post) => {
    setMostrarTodosPosts(false);
    setPost(post);
    setPostAModificar(null);
    setMostrarPost(true);
  };

  const handleModificarPost = (post) => {
    setMostrarTodosPosts(false);
    setPost(null);
    setMostrarPost(false);
    setPostAModificar(post);
  };

  const handleSidebarClick = () => {
    setShowSidebar(true);
    setDisplayBtn(false);
  };

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
