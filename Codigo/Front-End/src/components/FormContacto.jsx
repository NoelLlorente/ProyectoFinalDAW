import estilos from "../styles/formularioContacto.module.css";

export const FormContacto = () => {
  return (
    <div className={`container ${estilos.contenedor}`}>
      <form className={estilos.form}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            aria-describedby="emailHelp"
          />
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
          />
        </div>
        <div className="mb-3">
          <label htmlFor="asunto" className="form-label">
            Asunto
          </label>
          <input type="text" className="form-control" id="asunto" />
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
          ></textarea>
        </div>
        <button type="button" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
};
