/* eslint-disable react/prop-types */

import estilos from "../styles/perfilUsuario.module.css";
import { Alert } from "react-bootstrap";
import { ChangeUserPassword } from "../components/ChangeUserPassword";
import { useState } from "react";

export const Perfil = ({ user, isLoading }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handlePasswordChange = (changed) => {
    setPasswordChanged(changed);
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (passwordChanged) {
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }

  return (
    <div className={`container ${estilos.contenedor_principal}`}>
      <div className={`container-fluid ${estilos.contenedor_informacion}`}>
        <div className={`container-fluid ${estilos.info_usuario}`}>
          <img src={user.picture} alt={user.name} />
          <h4>Nombre usuario:</h4>
          <p>{user.nickname}</p>
          <h4>Correo:</h4>
          <p>{user.email}</p>
          <button
            className="btn btn-primary"
            onClick={() => setShowChangePassword(true)}
          >
            Cambiar contraseña
          </button>
        </div>
        {passwordChanged && (
          <Alert style={{ marginTop: "1rem" }} variant="success">
            ¡La contraseña se ha cambiado con éxito!
          </Alert>
        )}
        <ChangeUserPassword
          show={showChangePassword}
          onHide={() => setShowChangePassword(false)}
          onPasswordChange={handlePasswordChange}
          user={user}
        />
      </div>
    </div>
  );
};
