/* eslint-disable react/prop-types */
import { changeUserPass } from "../Tools/changeUserPass";
import { Button } from "react-bootstrap";
import { getAuthToken } from "../Tools/getAuthToken";
import { getUserId } from "../Tools/getUserId";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { PasswordRequirements } from "./PasswordRequirements";
import { PasswordChangeForm } from "./PasswordChangeForm";
import { PasswordAlerts } from "./PasswordAlerts";

export const ChangeUserPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [changingPass, setChangingPass] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    minLength: null,
    hasLowercase: null,
    hasUppercase: null,
    hasNumbers: null,
    hasSpecialChar: null,
  });
  const [allRequirementsMet, setAllRequirementsMet] = useState(false);
  const { onPasswordChange, ...modalProps } = props;

  const resetForm = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const handleClose = () => {
    resetForm();
    props.onHide();
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setChangingPass(true);
    const allRequirements = Object.values(passwordValid).every((val) => val);
    setAllRequirementsMet(allRequirements);
    if (confirmPassword && allRequirements) {
      if (token && usuario && password) {
        try {
          const response = await changeUserPass(
            usuario.user_id,
            token,
            password
          );
          if (response) {
            handleClose();
            onPasswordChange(true);
          }
        } catch (error) {
          console.error("Error al cambiar la contraseña", error);
        }
      }
    }
  };

  useEffect(() => {
    setPasswordValid({
      minLength: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumbers: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password),
    });
  }, [password]);

  useEffect(() => {
    const fetchToken = async () => {
      const result = await getAuthToken();
      if (result) {
        setToken(result.access_token);
        const userIdResult = await getUserId(
          props.user.email,
          result.access_token
        );
        if (userIdResult) {
          setUsuario(userIdResult[0]);
        }
      }
    };
    fetchToken();
  }, [changingPass]);

  return (
    <Modal
      {...modalProps}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Cambiar Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body
        onCopy={(e) => {
          e.preventDefault();
        }}
        onPaste={(e) => e.preventDefault()}
      >
        <PasswordChangeForm
          password={password}
          confirmPassword={confirmPassword}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
        />
        <PasswordRequirements passwordValid={passwordValid} />
        <PasswordAlerts
          password={password}
          confirmPassword={confirmPassword}
          allRequirementsMet={allRequirementsMet}
          changingPass={changingPass}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleChangePassword}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
