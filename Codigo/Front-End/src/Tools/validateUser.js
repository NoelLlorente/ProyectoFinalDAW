export const validateUser = async (user) => {
  try {
    const response = await fetch(
      `https://localhost:7296/Usuario/validarUsuario?correo=${user.email}`
    );
    const data = await response.text();

    if (data === "true") {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error validando usuario:", error);
  }
};
