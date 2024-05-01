/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";

/**
 * Este componente contiene los mensajes que se mostrarán de requisitos que se deben cumplier para el cambio de contraseña.
 * Este se llama en el componente {@link Perfil.ChangeUserPassword}
 *
 * @function PasswordRequirements
 * @prop {boolean} passwordValid Es un booleano que nos indica si la contraseña es valida o no.
 * @returns {JSX.Element} Se retorna el componente.
 */
export const PasswordRequirements = ({ passwordValid }) => (
  <Form.Text className="text-muted">
    Su contraseña debe contener:
    <ul>
      <li style={{ color: passwordValid.minLength ? "green" : "black" }}>
        {passwordValid.minLength ? "✔️" : "•"} Al menos 8 caracteres de largo
      </li>
      <li style={{ color: passwordValid.hasLowercase ? "green" : "black" }}>
        {passwordValid.hasLowercase ? "✔️" : "•"} Letras minúsculas (a-z)
      </li>
      <li style={{ color: passwordValid.hasUppercase ? "green" : "black" }}>
        {passwordValid.hasUppercase ? "✔️" : "•"} Letras mayúsculas (A-Z)
      </li>
      <li style={{ color: passwordValid.hasNumbers ? "green" : "black" }}>
        {passwordValid.hasNumbers ? "✔️" : "•"} Números (0-9)
      </li>
      <li style={{ color: passwordValid.hasSpecialChar ? "green" : "black" }}>
        {passwordValid.hasSpecialChar ? "✔️" : "•"} Caracteres especiales (por
        ejemplo, !@#$%^&*)
      </li>
    </ul>
  </Form.Text>
);
