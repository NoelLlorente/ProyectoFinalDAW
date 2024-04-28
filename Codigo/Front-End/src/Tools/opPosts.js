import axios from "axios";
import { getDate } from "./getDate";

export const getPosts = async () => {
  try {
    const response = await axios.get(
      `https://localhost:7296/api/Post/cargarPosts`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error al cargar los datos de los posts: " + error);
  }
};

export const getPostsUsuario = async (email) => {
  try {
    const response = await axios.get(
      `https://localhost:7296/api/Post/cargarPostsUsuario?correo=${email}`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error al cargar los datos de las posts del usuario: " + error);
  }
};

export const createPost = async (post, email) => {
  try {
    const response = await axios.post(
      `https://localhost:7296/api/Post/crearPost?correo=${email}`,
      {
        descripcion: post.descripcion,
        fecha: getDate(),
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error al crear post: " + error);
  }
};

export const deletePost = async (id, email) => {
  try {
    const response = await axios.get(
      `https://localhost:7296/api/Post/eliminarPost?correo=${email}&idPost=${id}`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error al eliminar el post del usuario: " + error);
  }
};

export const deletePosts = async (email) => {
  try {
    const response = await axios.get(
      `https://localhost:7296/api/Post/eliminarPosts?correo=${email}`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error al eliminar los posts del usuario: " + error);
  }
};

export const updatePost = async (id, email, descripcion) => {
  try {
    const response = await axios.post(
      `https://localhost:7296/api/Post/actualizarPost?correo=${email}&idPost=${id}`,
      JSON.stringify(descripcion),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error al crear post: " + error);
  }
};
