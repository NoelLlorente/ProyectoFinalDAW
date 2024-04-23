/* eslint-disable react/prop-types */
import { useState } from "react";
import estilos from "../styles/formConsultas.module.css";

export const FormConsultas = ({ onSubmit }) => {
  const [descripcion, setDescripcion] = useState("");
  const [presupuesto, setPresupuesto] = useState(0);
  const [tipo, setTipo] = useState("Online");

  const handleSubmit = (e) => {
    e.preventDefault();
    const detail = {
      descripcion: descripcion,
      presupuesto: presupuesto,
      tipo: tipo,
    };
    onSubmit(detail);
  };

  return (
    <div className={`container ${estilos.contenedorForm}`}>
      <form className={estilos.form}>
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
          ></textarea>
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
          />
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
        <button className="btn btn-primary" onClick={handleSubmit}>
          Consultar
        </button>
      </form>
    </div>
  );
};
