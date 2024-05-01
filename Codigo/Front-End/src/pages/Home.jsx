/* eslint-disable react/prop-types */
import { Compromiso } from "../components/Compromiso";
import { HeaderHome } from "../components/HeaderHome";
import { WhatWeDo } from "../components/WhatWeDo";

/**
 * Este es el componente Home, lo que viene a ser la vista del Home
 * Acá se llaman a los componentes HeaderHome, WhatWeDo y Compromiso.
 * Estos componentes importados se mostrarán en el componente padre (Home)
 *
 * @namespace Home
 * @prop {boolean} isAuthenticated - Valida que el usuario está autenticado
 * @returns {JSX.Element}  El componente renderizado
 */
export const Home = ({ isAuthenticated }) => {
  return (
    <>
      <HeaderHome isAuthenticated={isAuthenticated}></HeaderHome>
      <WhatWeDo></WhatWeDo>
      <Compromiso></Compromiso>
    </>
  );
};
