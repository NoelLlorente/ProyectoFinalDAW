import axios from "axios";

/**
 * Esta función se utiliza en el componente {@link Perfil.ChangeUserPassword} para cambiar la contraseña del usuario
 * @function changeUserPass
 * @param {Number} id Es el id del usuario
 * @param {String} token Es el token que se consigue con otra función
 * @param {String} newPass Es la nueva contraseña
 * @returns {Promise<Object>} Se retorna la promesa con el objeto
 */
export const changeUserPass = async (id, token, newPass) => {
  const data = JSON.stringify({
    password: newPass,
  });

  var config = {
    method: "patch",
    url: import.meta.env.VITE_AUTH0_USERS_DOMAIN + id,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  try {
    var response = await axios(config);
    var resultado = await response.data;
    return resultado;
  } catch (error) {
    console.log("error", error);
  }
};
