import axios from "axios";

/**
 * Esta función se utiliza en el componente {@link Pefil.ChangeUserPassword} para obtener el id del usuario
 * @function getUserId
 * @param {String} email Es el correo del usuario
 * @param {String} token Es el token que se obtiene con otra función
 * @returns {Promise<Object>} Se retorna la promesa con el objeto
 */
export const getUserId = async (email, token) => {
  const settings = {
    method: "GET",
    url: import.meta.env.VITE_AUTH0_API_DOMAIN + "users",
    params: { q: `email:${email}`, search_engine: "v3" },
    headers: {
      authorization: "Bearer " + token,
    },
  };
  try {
    const response = await axios(settings);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error al obtener el token de Auth0", error);
  }
};
