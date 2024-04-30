import { useState, useEffect } from "react";
import estilos from "../styles/formularioContacto.module.css";

/**
 * Componente FormContacto, será el formulario de la vista Contacto.
 * Acá se rellenan los datos, se validán y se simula un mensaje de que todo ha ido bien.
 * Este formulario no se envía a ningun sitio, solo es para mejorar el diseño.
 * @componente
 * @memberof Contacto
 * @returns {JSX.Element} Se retorna el componente renderizado
 */
export const FormContacto = () => {
  /**
   * Se crear useState para manejar los estados de los inputs del formulario.
   * Y para actualizarles y validarles.
   */
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [asunto, setAsunto] = useState("");
  const [contenido, setContenido] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  /**
   * Se utiliza el useEffect para validar el formulario, este se valida en tiempo real gracias a los useState.
   * Si se han validado entonces el cuando demos al botón de enviar nos mostrar un mensaje de éxito.
   */
  useEffect(() => {
    const forms = document.querySelectorAll(".needs-validation");
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  }, []);

  /**
   *
   * Esta función es el manejador del click del botón enviar.
   * Cuando hagamos click si los campos son válidos se mostrará el mensaje de éxito.
   * Esto se hace actualizando el estado setShowAlert a true.
   * Si los campos son válidos se resetea el formulario y se remueve la clase was-validated.
   * @function handleSubmit
   * @memberof FormContacto
   * @param {Event} e es el Evento del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !email || !asunto || !contenido) {
      return;
    }
    setNombre("");
    setEmail("");
    setAsunto("");
    setContenido("");
    setShowAlert(true);
    e.target.classList.remove("was-validated");
  };

  /**
   * Se retorna el html con las validaciones y los datos del componente.
   */
  return (
    <div className={`container ${estilos.contenedor}`}>
      <form
        className={`needs-validation ${estilos.form}`}
        noValidate
        onSubmit={handleSubmit}
      >
        {showAlert && (
          <div className="alert alert-success" role="alert">
            Mensaje enviado con éxito!
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            aria-describedby="emailHelp"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <div className="invalid-feedback">
            Por favor, proporciona un nombre.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="nombre@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="invalid-feedback">
            Por favor, proporciona un email válido.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="asunto" className="form-label">
            Asunto
          </label>
          <input
            type="text"
            className="form-control"
            id="asunto"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            required
          />
          <div className="invalid-feedback">
            Por favor, proporciona un asunto.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="contenido" className="form-label">
            Contenido
          </label>
          <textarea
            className="form-control"
            id="contenido"
            rows="6"
            maxLength="500"
            style={{ resize: "none" }}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
          ></textarea>
          <div className="invalid-feedback">
            Por favor, proporciona contenido.
          </div>
        </div>
        <button
          type="submit"
          className={`btn btn-primary ${estilos.btn_contactoform}`}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
