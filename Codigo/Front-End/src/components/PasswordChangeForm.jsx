/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";
import { PasswordInput } from "./PasswordInput";

/**
 * Este componente será el formulario del cambio de la contraseña del usuario.
 * Este componente se utiliza en el componente {@link ChangeUserPassword} de la vista {@link Perfil}.
 * Acá se llama al componente {@link PasswordInput}.
 *
 * @function PasswordChangeForm
 * @prop {string} password Será el string de la contraseña.
 * @prop {string} confirmPassword Será el string de la 2da contraseña.
 * @prop {setter} setPassword Es el setter para cambiar el estado de password.
 * @prop {setter} setConfirmPassword Es el setter para cambiar el estado de confirmPassword.
 * @returns {JSX.Element} Se retorna el elemento
 */
export const PasswordChangeForm = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
}) => (
  <Form>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Contraseña Nueva:</Form.Label>
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña..."
        autoFocus={true}
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
      <Form.Label>Repita Contraseña:</Form.Label>
      <PasswordInput
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Repita contraseña..."
      />
    </Form.Group>
  </Form>
);
