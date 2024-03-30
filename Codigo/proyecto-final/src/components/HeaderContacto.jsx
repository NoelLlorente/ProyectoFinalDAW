import estilos from "../styles/header.module.css";

export const HeaderContacto = () => {
  return (
    <div className={`container-fluid ${estilos.header} ${estilos.contacto}`}>
      <h1>Contacto</h1>
      <p>
        ¿Tienes alguna pregunta o comentario? ¡Estamos aquí para ayudarte!
        Utiliza el formulario a continuación para ponerte en contacto con
        nosotros. Responderemos lo antes posible.
      </p>
    </div>
  );
};
