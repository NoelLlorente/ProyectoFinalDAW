/* eslint-disable react/prop-types */
import { useEffect, useReducer } from "react";
import {
  getPosts,
  getPostsUsuario,
  createPost,
  deletePost,
  deletePosts,
  updatePost,
} from "../Tools/opPosts";
import { PostContext } from "./PostContext";

/**
 * Se inicializa el estado en un array vacío
 */
const initialState = [];

/**
 * Este componente es el provider, osea acá se le da funcionalidad a toda la vista de Blog,
 * en este provider se crean los posts tanto en la db como en el initialState, también se eliminan los posts.
 * Básicamente si yo borro un post, se borra tanto del provider como de la db.
 *
 * @function PostProvider
 * @memberof Blog
 * @prop {Object} user Es el objeto que contiene los datos del usuario logueado.
 * @prop {array} children Serán los hijos de este componente.
 * @returns {JSX.Element} Se retorna el componente PostContext.Provider con las funcionalidades de este provider.
 */
export const PostProvider = ({ user, children }) => {
  /**
   * Se crea un reducer, osea en este reducer se realizarán las funciones sobre el initialState.
   *
   * @param {Array} state Es el estado inicial (initialState), osea un array vacio
   * @param {Object} action Será la acción, según está se realizará una cosa del switch.
   * @returns {State} Se retorna un estado.
   */
  const postsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case "[POST] Cargar Posts":
        return action.payload;
      case "[POST] Agregar Post":
        return [...state, action.payload];
      case "[POST] Eliminar Post":
        return state.filter((post) => post.id !== action.payload);
      case "[POST] Modificar Post":
        return state.map((post) => {
          if (post.id === action.payload.id) {
            return {
              ...post,
              descripcion: action.payload.descripcion,
            };
          }
          return post;
        });
      case "[POST] Eliminar Posts":
        return [];
      default:
        return state;
    }
  };

  /**
   * Llamamos al reducer que creamos anteriormente y obtenemos la lista de post de toda la db y el dispatch
   */
  const [listaPosts, dispatch] = useReducer(postsReducer, initialState);
  /**
   * Llamamos al reducer que creamos anteriormente y obtenemos la lista de post del usuario logueado y el dispatch
   */
  const [listaPostsUsuario, dispatchUsuario] = useReducer(
    postsReducer,
    initialState
  );

  /**
   * Este useEffect se ejecutará cada vez que cambie el objeto usuario, osea cada vez que sea un usuario distinto.
   * Acá se cargan los posts de la db, y se realiza el dispatch que cambiará los datos en el estado initialState o mejor dicho listaPosts y listaPostsUsuario.
   */
  useEffect(() => {
    if (user) {
      const cargarPosts = async () => {
        const datos = await getPosts();
        dispatch({ type: "[POST] Cargar Posts", payload: datos });
      };
      cargarPosts();

      const cargarPostsUsuario = async () => {
        const datosUsuario = await getPostsUsuario(user.email);
        dispatchUsuario({ type: "[POST] Cargar Posts", payload: datosUsuario });
      };
      cargarPostsUsuario();
    }
  }, [user]);

  /**
   * Es una función que nos permitirá crear un post, y añadirla a la db, a la listaPosts y listaPostsUsuario.
   * Como se puede ver se llama a una función createPost, esta función es la que se encarga se llamar a un api pasandole los datos, y estos se guardarán en la db.
   *
   * @param {Object} post Es el objeto que contiene los datos del post que se va a añadir a la db, a la listaPosts y listaPostsUsuario.
   * @returns {Object} Se retorna un objeto con los datos del post que se ha guardado en la db.
   */
  const agregarPost = async (post) => {
    const nuevoPost = await createPost(post, user.email);
    const action = {
      type: "[POST] Agregar Post",
      payload: nuevoPost,
    };
    dispatch(action);
    dispatchUsuario(action);
    return nuevoPost;
  };

  /**
   * Es una función que nos permitirá eliminar un post dado un id, y eliminarlo de la db, como de la listaPosts y listaPostsUsuario.
   * Como se puede ver se llama a una función deletePost, esta función es la que se encarga de llamar a un api que realizará la eliminación de la db.
   *
   * @param {number} id Es el id del post a eliminar
   * @returns {None} No retorna nada
   */
  const eliminarPost = async (id) => {
    await deletePost(id, user.email);
    const action = {
      type: "[POST] Eliminar Post",
      payload: id,
    };
    dispatch(action);
    dispatchUsuario(action);
  };

  /**
   * Es una función que se utiliza para modificar un post, tanto en la db como en ambas listas.
   *
   * @param {number} id Es el id del post a modificar.
   * @param {string} descripcion Es la descripción del post.
   * @returns {Object} Se retorna un objeto que contiene los datos del post que se ha modificado en la db.
   */
  const modificarPost = async (id, descripcion) => {
    const postActualizado = await updatePost(id, user.email, descripcion);
    const action = {
      type: "[POST] Modificar Post",
      payload: postActualizado,
    };
    dispatch(action);
    dispatchUsuario(action);
    return postActualizado;
  };

  /**
   * Es una función que nos permitirá eliminar todas los posts, tanto de la db, como de la listaPosts y listaPostsUsuario.
   * Como se puede ver se llama a una función deletePosts, esta función es la que se encarga se llamar a un api que realizará la eliminación de la db.
   * También una vez eliminado todos los posts del usuario, se cargan nuevamente todos los datos al initialState(listaPosts, listaPostsUsuario),
   * por eso se llama a getPosts y getPostsUsuario.
   *
   * @returns {None} No retorna nada
   */
  const eliminarPosts = async () => {
    await deletePosts(user.email);
    const action = {
      type: "[POST] Eliminar Posts",
    };
    dispatch(action);
    dispatchUsuario(action);

    const datos = await getPosts();
    dispatch({ type: "[POST] Cargar Posts", payload: datos });

    const datosUsuario = await getPostsUsuario(user.email);
    dispatchUsuario({ type: "[POST] Cargar Posts", payload: datosUsuario });
  };

  /**
   * Se retorna este Provider con sus funcionalidades y sus listas.
   */
  return (
    <PostContext.Provider
      value={{
        listaPosts,
        listaPostsUsuario,
        agregarPost,
        eliminarPost,
        modificarPost,
        eliminarPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
