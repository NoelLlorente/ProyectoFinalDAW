/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import estilos from "../styles/formConsultas.module.css";

/**
 * Este componente es el formulario que se utiliza para crear las consultas.
 * Acá se validan los datos, si son correctos se crea la consulta, sino se muestran los errores en tiempo real.
 * @function FormConsultas
 * @memberof Consultas
 * @prop {function} agregarConsulta  Es una funcion del provider que nos permite agregar la consulta tanto a la db como al provider.
 * @prop {setter} setConsulta Nos permite cambiar el estado de la propiedad consulta.
 * @prop {setter} setMostrarResultado Nos permite cambiar el estado de la propiedad mostrarResultado.
 * @prop {function} agregarConsultaResultado Es una funcion del provider que nos permite agregar el resultado de la consulta tanto a la db como al provider. Osea cuando usamos agregarConsulta también se utiliza esta función.
 * @returns {JSX.Element} Se retorna el componente.
 */
export const FormConsultas = ({
  agregarConsulta,
  setConsulta,
  setMostrarResultado,
  agregarConsultaResultado,
}) => {
  /**
   * Se crean los estados o propiedad cada una con su setter.
   */
  const [descripcion, setDescripcion] = useState("");
  const [presupuesto, setPresupuesto] = useState(50);
  const [tipo, setTipo] = useState("Online");

  /**
   * Se utiliza el useEffect para validar el formulario en tiempo real.
   */
  useEffect(() => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
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
   * En esta función se comprueba que los datos esten bien y si es asi se crea la consulta asi como su resultado.
   * También se utilizan los setter para cambiar los estados de las props.
   * @function FormConsultas_handleSubmit
   * @param {Event} e Es el evento del formulario
   * @returns {None} No retorna nada
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descripcion || !presupuesto || !tipo || presupuesto < 50) {
      return;
    }

    const detail = {
      descripcion: descripcion,
      presupuesto: presupuesto,
      tipo: tipo,
    };
    const id = await agregarConsulta(detail);
    detail.id = id;
    setConsulta(detail);
    agregarConsultaResultado(detail);
    setMostrarResultado(true);
  };

  return (
    <div className={`container ${estilos.contenedorForm}`}>
      <form
        className={`needs-validation ${estilos.form}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <h2>Formulario Consultas</h2>
        <div className="mb-3">
          <label htmlFor="nombreProyecto" className="Form-label">
            Nombre proyecto:
          </label>
          <input
            type="text"
            className="Form-control"
            id="nombreProyecto"
            placeholder="Nombre del proyecto..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcionProyecto" className="form-label">
            Descripción proyecto:
          </label>
          <textarea
            className="form-control"
            id="descripcionProyecto"
            rows="5"
            maxLength="500"
            style={{ resize: "none" }}
            placeholder="Breve descripción del proyecto..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
          <div className="invalid-feedback">
            Por favor, proporciona una descripción.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="presupuesto" className="Form-label">
            Presupuesto:
          </label>
          <input
            type="number"
            className="Form-control"
            id="presupuesto"
            placeholder="Presupuesto monetario..."
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
            min="50"
            required
          />
          <div className="invalid-feedback">
            Por favor, proporciona un presupuesto válido (mínimo 50).
          </div>
        </div>
        <div>
          <label className="Form-label">Plataforma:</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onChange={(e) => setTipo(e.target.value)}
              defaultChecked
              required
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Online
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              disabled
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Físico
            </label>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Consultar
        </button>
      </form>
    </div>
  );
};
