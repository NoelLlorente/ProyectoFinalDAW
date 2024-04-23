import { getDate } from "./getDate";

export const saveUser = async (user) => {
  try {
    const usuario = { correo: user.email, fecha: getDate() };
    const response = await fetch(
      "https://localhost:7296/Usuario/guardarUsuario",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      }
    );
    const data = await response.text();
    if (data === "true") {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error saving user:", error);
  }
};
