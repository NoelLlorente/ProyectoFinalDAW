/* eslint-disable react/prop-types */
import { useState } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

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
