/* eslint-disable react/prop-types */
import { useAuth0 } from "@auth0/auth0-react";

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
