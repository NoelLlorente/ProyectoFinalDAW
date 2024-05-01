/* eslint-disable react/prop-types */
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Este componente es un botón que tiene la funcionalidad de llevarnos al formulario de login de JWT.
 * Este componente se llama en el componente {@link Home.HeaderHome} y en {@link Navbar}
 * @function LoginButton
 * @prop {string} className Es un string que contiene un nombre de clase css.
 * @prop {string} texto Es el texto que va a contener el botón.
 * @returns {JSX.Element} Se retorna el componente para ser renderizado
 */
export const LoginButton = ({ className, texto }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className={`btn btn-primary ${className}`}
      onClick={() => loginWithRedirect()}
    >
      {texto}
    </button>
  );
};
