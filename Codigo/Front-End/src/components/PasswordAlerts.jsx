/* eslint-disable react/prop-types */
import { Alert } from "react-bootstrap";

/**
 * Este componente mostrará los alerts en el componente {@link Perfil.ChangeUserPassword}.
 * Estos alerts se muestran cuando la constraseña esta vacia, o que no coincidan, o que no se hayan cumplido con los requisitos para cambiar la contraseña.
 *
 * @function PasswordAlerts
 * @prop {string} password Es el estado que contiene el string con la contraseña.
 * @prop {string} confirmPassword Es el estado que contiene el string con la 2da contraseña que hay que introducir.
 * @prop {boolean} allRequirementsMet Es un booleano que indica si se han cumplido todos los requisitos.
 * @prop {boolean} changingPass Es un booleano que indica si se esta cambiando la contraseña.
 * @returns {JSX.Element} Se retorna el componente.
 */
export const PasswordAlerts = ({
  password,
  confirmPassword,
  allRequirementsMet,
  changingPass,
}) => (
  <>
    {password !== confirmPassword && (
      <Alert variant="danger">Las contraseñas no coinciden</Alert>
    )}
    {password.length == 0 && (
      <Alert variant="danger">
        Verifique que alguna de las contraseñas no este vacía
      </Alert>
    )}
    {changingPass && !allRequirementsMet && (
      <Alert variant="danger">
        No se han cumplido los requisitos de la contraseña
      </Alert>
    )}
  </>
);
