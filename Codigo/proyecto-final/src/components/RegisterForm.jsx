import estilos from "../styles/loginRegister.module.css";
import { MdEmail } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  return (
    <div className={`container-fluid ${estilos.contenedor}`}>
      <div className={`container ${estilos.contenedor_formulario_register}`}>
        <div className={estilos.imagen}>
          <img
            src="https://t3.ftcdn.net/jpg/01/22/71/96/360_F_122719641_V0yw2cAOrfxsON3HeWi2Sf4iVxhv27QO.jpg"
            alt="imagen login"
          />
        </div>
        <form className={estilos.form}>
          <h1>Crea tu cuenta</h1>
          <label className="form-label" htmlFor="email">
            Nombre
          </label>
          <div className={estilos.inputs}>
            <FaUser className="icon" />
            <input className="form-control" type="text" id="email" />
          </div>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <div className={estilos.inputs}>
            <MdEmail className="icon" />
            <input className="form-control" type="text" id="email" />
          </div>
          <label className="form-label" htmlFor="contrasena1">
            Contraseña
          </label>
          <div className={estilos.inputs}>
            <MdLock className="icon" />
            <input type="password" className="form-control" id="contrasena1" />
          </div>
          <label className="form-label" htmlFor="contrasena2">
            Repita la contraseña
          </label>
          <div className={estilos.inputs}>
            <MdLock className="icon" />
            <input type="password" className="form-control" id="contrasena2" />
          </div>

          <button type="button" className="btn btn-primary">
            Registrarse
          </button>
          <span>
            ¡Si ya tienes cuenta, inicia sesión!{" "}
            <Link to="/login">Iniciar Sesión</Link>
          </span>
        </form>
      </div>
    </div>
  );
};
