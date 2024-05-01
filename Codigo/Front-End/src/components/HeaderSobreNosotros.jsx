import estilos from "../styles/header.module.css";

/**
 * Este es el componente HeaderSobreNosotros, será el header que se mostrará en la vista Sobre Nosotros.
 * Básicamente sería el encabezado de Sobre Nosotros.
 * Acá se describirá brevemente de que tratará el sitio web.
 * @memberof SobreNosotros
 * @function HeaderSobreNosotros
 * @returns {JSX.Element} El componente renderizado
 */
export const HeaderSobreNosotros = () => {
  return (
    <div
      className={`container-fluid ${estilos.header} ${estilos.sobreNosotros}`}
    >
      <h1>Sobre Nosotros</h1>
      <p>
        Somos un equipo apasionado por el emprendimiento y la innovación.
        Nuestra misión es ayudarte a convertir tus ideas en realidades exitosas.
        ¿Tienes una idea de negocio o un proyecto en mente? ¡Estamos aquí para
        guiarte en cada paso del camino!
      </p>
    </div>
  );
};
