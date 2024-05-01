import axios from "axios";

/**
 * Esto es la funcion que se utilia para obtener el token del api de JWT.
 * Este token le utilizaremos para obtener el id del usuario.
 * También para llamar a otro api que nos permitirá cambiar la contraseña
 * Se utiliza en el componente {@link Perfil.ChangeUserPassword}
 * @function getAuthToken
 * @returns {Promise<Object>} - Devuelve un objeto junto con el Token.
 */
export const getAuthToken = async () => {
  const settings = {
    method: "POST",
    url: import.meta.env.VITE_AUTH0_DOMAIN,
    headers: {
      "content-type": "application/json",
    },
    data: JSON.stringify({
      client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
      client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
      audience: import.meta.env.VITE_AUTH0_API_DOMAIN,
      grant_type: "client_credentials",
    }),
  };

  try {
    const response = await axios(settings);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error al obtener el token de Auth0", error);
  }
};
