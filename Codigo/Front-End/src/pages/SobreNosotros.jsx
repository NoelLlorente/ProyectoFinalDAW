import estilos from "../styles/sobreNosotros.module.css";
import { HeaderSobreNosotros } from "../components/HeaderSobreNosotros";
import { EnfoqueSobreNosotros } from "../components/EnfoqueSobreNosotros";

/**
 * Este es el componente SobreNosotros, es la vista de Sobre Nosotros en el sitio web.
 * Acá se llaman a los componentes HeaderSobreNosotros y EnfoqueSobreNosotros.
 * @namespace SobreNosotros
 * @page
 * @component
 * @returns {JSX.Element} El componente renderizado
 */
export const SobreNosotros = () => {
  return (
    <div className={`container-fluid ${estilos.contenedorPrincipal}`}>
      <HeaderSobreNosotros />
      <div className={`container ${estilos.historia}`}>
        <h3>Nuestra Historia</h3>
        <p>
          Hace cinco años, comenzamos nuestro propio viaje empresarial.
          Aprendimos lecciones valiosas, superamos desafíos y celebramos éxitos.
          Ahora queremos compartir ese conocimiento contigo. Creemos que cada
          idea tiene el potencial de cambiar el mundo, y estamos comprometidos a
          brindarte las herramientas y el apoyo necesarios para lograrlo.
        </p>
      </div>
      <EnfoqueSobreNosotros estilos={estilos} />
      <div className={`container ${estilos.nuestroViaje}`}>
        <h3>Únete a Nuestro Viaje</h3>
        <p>
          The Business Journey es más que una plataforma, es una comunidad.
          Únete a nosotros y descubre cómo tus ideas pueden convertirse en
          historias de éxito. Juntos, navegaremos por los desafíos, celebraremos
          los logros y construiremos un futuro empresarial brillante.
        </p>
        <p>¡Bienvenido a nuestro viaje!</p>
      </div>
    </div>
  );
};
