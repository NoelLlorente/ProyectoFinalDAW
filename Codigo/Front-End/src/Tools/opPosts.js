import axios from "axios";
import { getDate } from "./getDate";

/**
 * Esta es la función que se llama en el provider {@link Blog.PostProvider} para cargar todos los posts de la db.
 * En esta función se llama a mi api rest para cargar los datos.
 *
 * @function getPosts
 * @returns {Promise<Object>} Se retorna una promesa que contiene un array de objetos.
 */
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

/**
 * Esta es la función que se llama en el provider {@link Blog.PostProvider} para cargar todos los posts del usuario logueado de la db.
 * En esta función se llama a mi api rest para cargar los datos.
 *
 * @function getPostsUsuario
 * @param {string } email Es el correo del usuario logueado.
 * @returns {Promise<Object>} Se retorna una promesa que contiene un array de objetos.
 */
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

/**
 * Esta es la función que se llama en el provider {@link Blog.PostProvider} para crear los posts.
 * En esta función se llama a mi api rest pasandole el email del usuario, y los datos del post, para guardarle en la db.
 * También en esta función se ve como llamamos al getDate(), esta es una función que nos devuelve la fecha y hora actual en un formato que la db entiende.
 *
 * @function createPost
 * @param {Object} post Es el objeto que contiene los datos del post.
 * @param {string} email Es el correo del usuario logueado.
 * @returns {Promise<Object>} Se retorna una promesa que contiene el objeto.
 */
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

/**
 * Esta es la función que se llama en el provider {@link Blog.PostProvider} para eliminar un post.
 * En esta función se llama a mi api rest pasandole el email del usuario, y el id del post, para eliminarle en la db.
 *
 * @function deletePost
 * @param {number} id Es el id del post a eliminar
 * @param {string} email Es el correo del usuario logueado.
 * @returns {Promise<Object>} Se retorna una promesa que contiene el objeto.
 */
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

/**
 * Esta es la función que se llama en el provider {@link Blog.PostProvider} para eliminar todas los posts.
 * En esta función se llama a mi api rest pasandole el email del usuario, para eliminar todos los posts del usuario de la db.
 *
 * @function deletePosts
 * @param {string} email Es el correo del usuario logueado.
 * @returns {Promise<Object>} Se retorna una promesa que contiene el objeto.
 */
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

/**
 * Esta es la función que se llama en el provider {@link Blog.PostProvider} para modificar un post.
 * En esta función se llama a mi api rest pasandole el email del usuario, el id del post a modificar, y la descripción del post, para actualizarle en la db.
 *
 * @param {number} id Es el id del post a modificar.
 * @param {string} email Es el correo del usuario logueado.
 * @param {string} descripcion Es la nueva descripción del post.
 * @returns {Promise<Object>} Se retorna una promesa que contiene el objeto con los datos del usuario modificado.
 */
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
