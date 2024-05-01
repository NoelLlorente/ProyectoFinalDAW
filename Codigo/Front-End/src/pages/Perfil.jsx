/* eslint-disable react/prop-types */

import estilos from "../styles/perfilUsuario.module.css";
import { Alert } from "react-bootstrap";
import { ChangeUserPassword } from "../components/ChangeUserPassword";
import { useState } from "react";

/**
 * Este componente es la vista perfil del sitio web, en el se llama el componente ChangeUserPassword.
 * En este componente se mostrará la información del usuario, asi como el botón para cambiar la contraseña.
 * @namespace Perfil
 * @prop {Object} user Es el objeto que se crea cuando el usuario se loguea, este objeto es creado por JWT.
 * @prop {Boolean} isLoading Este nos dice si una vez loguado el usuario todavía se esta creando el objeto. Si es true se mostrará Cargando... en pantalla.
 * @returns {JSX.Element} Se retorna el componente
 */
export const Perfil = ({ user, isLoading }) => {
  /**
   * Se crear dos useState para manejar los estados de cuando mostrar el formulario de Cambiar contraseña y cuando ha cambiado la contraseña.
   * Cada useState esta conformado por su propiedad o variable y su setter.
   */
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  /**
   * Función que utiliza el setter de cuando la contraseña ha cambiado.
   * @function handlePasswordChange
   * @param {boolean} changed Es un booleano
   * @returns {None} No devuelve nada
   */
  const handlePasswordChange = (changed) => {
    setPasswordChanged(changed);
  };

  /**
   * Si is loading es true se muestra el mensaje Cargando...
   */
  if (isLoading) {
    return <div>Cargando ...</div>;
  }

  /**
   * Si la contraseña ha cambiado, entonces se recarga la página para que surta efecto el cambio, además de cerrarle la sesión al usuario.
   * Esto ocurre luego de que passwordChanged cambia a true, espera dos segundos y luego recarga la página.
   */
  if (passwordChanged) {
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }

  /**
   * Se retorna el html que queremos que se renderice.
   * Si la contraseña ha cambiado con éxtio mostramos un elemento Alert de la libreria de bootstrap-react, indicando que la contraseña se ha cambiado con éxito.
   * Se llama al componente ChangeUserPassword (Será un formulario) le pasaremos la función handlePasswordChange que anteriormente definimos.
   */
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
