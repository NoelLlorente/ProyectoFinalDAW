import { FormContacto } from "../components/FormContacto";
import { HeaderContacto } from "../components/HeaderContacto";

export const Contacto = () => {
  return (
    <div className="container-fluid" style={{ padding: "0" }}>
      <HeaderContacto />
      <FormContacto />
    </div>
  );
};
