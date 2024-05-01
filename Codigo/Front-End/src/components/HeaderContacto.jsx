import estilos from "../styles/header.module.css";

/**
 * Este componente HeaderContacto es el header de la vista Contacto.
 * Se muestra un mensaje indicando que pueden contactarnos a través del formulario
 * @memberof Contacto
 * @function HeaderContacto
 * @component
 * @returns {JSX.Element} Retorna el componente renderizado
 */
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
