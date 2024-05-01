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

/**
 * Este componente es el formulario para cambiar la contraseña del usuario. Este es llamado por la vista Perfil.
 * En este componente se válida el formulario y se llevan a cabo todas las operaciones necesarias para que el cambio de contraseña funcione.
 * A tener en cuenta la contraseña se cambia gracias a un token que se genera llamando a un api de JWT.
 * Luego eso token le utilizamos para llamar a otra api de JWT que nos permite realizar operaciones sobre un usuario. En este caso cambiar la contraseña.
 *
 * @memberof Perfil
 * @function ChangeUserPassword
 * @param {object} props Recibe propiedades desde el padre, la vista Perfil. Las propiedades son (show, onHide, onPasswordChange, user)
 * @returns {JSX.Element} El componente renderizado
 */
export const ChangeUserPassword = (props) => {
  /**
   * Se crean los useState necesarios para que todo funcione.
   * Se crea un useState que se utilizará como validador de la contraseña, este el passwordValid.
   */
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

  /** Obtenemos las props (propiedades) del padre, la vista Perfil. */
  const { onPasswordChange, ...modalProps } = props;

  /**
   * Función en la que se resetea con los setters de los useState el formulario.
   * @function resetForm
   * @returns {None} No retorna nada
   */
  const resetForm = () => {
    setPassword("");
    setConfirmPassword("");
  };

  /**
   * Ocultamos la modal y se llama a la función que resea el formulario
   * @function handleClose
   * @returns {None} No retorna nada
   */
  const handleClose = () => {
    resetForm();
    props.onHide();
  };

  /**
   * Funcion que maneja el cambio de la contraseña, acá se llama a una función changeUserPass con el id del usuario, el token y la nueva contraseña.
   * Obviamente esto si todos los campos se han validado y todo es correcto.
   * Esta función se llama en el botón.
   * @function handleChangePassword
   * @param {Event} e - Es el evento del formulario.
   * @return {None} No retorna nada
   */
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

  /**
   * Se utiliza el useEffect cada vez que cambie la contraseña, esto se utiliza para realizar validación en tiempo real.
   */
  useEffect(() => {
    setPasswordValid({
      minLength: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumbers: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password),
    });
  }, [password]);

  /**
   * Se utiliza el useEffect cada vez que cambia la propiedad o variable changingPass.
   * Acá se obtiene el token del api de JWT a través de una funcion getAuthToken()
   * También se obtiene el id del usuario que esta logueado actualmente.
   */
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

  /**
   * Se retorna el html y la funcionalidades que queremos que se renderice en el padre.
   */
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
