/* eslint-disable react/prop-types */
import { useState } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

/**
 * Componente que se utiliza en el componente {@link PasswordChangeForm}.
 * Como se puede ver estos inputs contendrán la funcionalidad de mostrar la contraseña.
 * @function PasswordInput
 * @prop {string} value Será el string de la contraseña que se ha escrito, se utilizará de value en el input (From.Control)
 * @prop {Event} onChange Será el evento que se utilizará en el input.
 * @prop {string} placeholder Será el texto que tendrá el input de placeholder.
 * @prop {Event} autoFocus Será el evento que que se haga auto focus en el input.
 * @returns {JSX.Element} Se retorna el componente
 */
export const PasswordInput = ({ value, onChange, placeholder, autoFocus }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <Form.Control
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete=""
        autoFocus={autoFocus}
      />
      <Button
        variant="outline-secondary"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeSlashFill /> : <EyeFill />}
      </Button>
    </InputGroup>
  );
};
