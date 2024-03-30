import estilos from "../styles/loginRegister.module.css";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { MdLock } from "react-icons/md";

export const LoginForm = () => {
  return (
    <div className={`container-fluid ${estilos.contenedor}`}>
      <div className={`container ${estilos.contenedor_formulario}`}>
        <div className={estilos.imagen}>
          <img
            src="https://t3.ftcdn.net/jpg/01/22/71/96/360_F_122719641_V0yw2cAOrfxsON3HeWi2Sf4iVxhv27QO.jpg"
            alt="imagen login"
          />
        </div>
        <form className={estilos.form}>
          <h1>Iniciar Sesión</h1>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <div className={estilos.inputs}>
            <MdEmail className="icon" />
            <input className="form-control" type="text" id="email" />
          </div>
          <label className="form-label" htmlFor="contrasena">
            Contraseña
          </label>
          <div className={estilos.inputs}>
            <MdLock className="icon" />
            <input type="password" className="form-control" id="contrasena" />
          </div>

          <button type="button" className="btn btn-primary">
            Iniciar Sesión
          </button>
          <span>
            ¡Si no tienes cuenta, crea la tuya!
            <Link to="/register">Crea tu cuenta</Link>
          </span>
        </form>
      </div>
    </div>
  );
};
