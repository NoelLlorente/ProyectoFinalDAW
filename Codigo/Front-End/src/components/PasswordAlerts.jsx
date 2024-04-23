/* eslint-disable react/prop-types */
import { Alert } from "react-bootstrap";
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
