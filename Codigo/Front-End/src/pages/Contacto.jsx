import { FormContacto } from "../components/FormContacto";
import { HeaderContacto } from "../components/HeaderContacto";

/**
 * Este componente será la vista de Contacto.
 * Acá llamamos a los componentes HeaderContacto y FormContacto.
 * @component
 * @namespace Contacto
 * @page
 * @returns {JSX.Element} Retornamos el componente Renderizado
 */
export const Contacto = () => {
  return (
    <div className="container-fluid" style={{ padding: "0" }}>
      <HeaderContacto />
      <FormContacto />
    </div>
  );
};
