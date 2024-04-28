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

const initialState = [];

export const PostProvider = ({ user, children }) => {
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

  const [listaPosts, dispatch] = useReducer(postsReducer, initialState);
  const [listaPostsUsuario, dispatchUsuario] = useReducer(
    postsReducer,
    initialState
  );

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

  const eliminarPost = async (id) => {
    await deletePost(id, user.email);
    const action = {
      type: "[POST] Eliminar Post",
      payload: id,
    };
    dispatch(action);
    dispatchUsuario(action);
  };

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
