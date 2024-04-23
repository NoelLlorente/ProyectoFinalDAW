/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";
import { PasswordInput } from "./PasswordInput";
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
