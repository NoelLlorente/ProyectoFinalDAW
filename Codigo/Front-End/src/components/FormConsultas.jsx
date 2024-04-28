/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import estilos from "../styles/formConsultas.module.css";

export const FormConsultas = ({
  agregarConsulta,
  setConsulta,
  setMostrarResultado,
  agregarConsultaResultado,
}) => {
  const [descripcion, setDescripcion] = useState("");
  const [presupuesto, setPresupuesto] = useState(50);
  const [tipo, setTipo] = useState("Online");

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
