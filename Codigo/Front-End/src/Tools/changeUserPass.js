import axios from "axios";

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
