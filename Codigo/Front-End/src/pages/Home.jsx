/* eslint-disable react/prop-types */
import { Compromiso } from "../components/Compromiso";
import { HeaderHome } from "../components/HeaderHome";

import { WhatWeDo } from "../components/WhatWeDo";
export const Home = ({ isAuthenticated }) => {
  return (
    <>
      <HeaderHome isAuthenticated={isAuthenticated}></HeaderHome>
      <WhatWeDo></WhatWeDo>
      <Compromiso></Compromiso>
    </>
  );
};
