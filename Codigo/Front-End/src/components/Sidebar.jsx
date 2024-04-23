/* eslint-disable react/prop-types */
import estilos from "../styles/sidebar.module.css";
import { BiArrowFromRight } from "react-icons/bi";
import { EntradaConsulta } from "./EntradaConsulta";
export const Sidebar = ({
  showSidebar,
  setShowSidebar,
  setDisplayBtn,
  widthSurpassed,
  consultas_resultados,
  handleConsultaClick,
  setCrearClicked,
  setMostrarResultado,
  handleEliminarConsultaClick,
}) => {
  const handleClickMenuBtn = () => {
    setShowSidebar(false);
    setDisplayBtn(true);
  };

  const handleClickCrear = () => {
    setCrearClicked(true);
    setMostrarResultado(false);
  };

  return (
    <div
      className={`${estilos.contenedor_sidebar} ${
        showSidebar ? estilos.abierto : estilos.cerrado
      }`}
      id="contenedor_sidebar"
    >
      {widthSurpassed && (
        <button
          className={`${estilos.btn_cerrarSidebar}`}
          onClick={handleClickMenuBtn}
        >
          <BiArrowFromRight />
        </button>
      )}
      <h2>Consultas</h2>
      <div className={estilos.botones}>
        <button className={`btn btn-primary`} onClick={handleClickCrear}>
          Crear
        </button>
        <button className={`btn btn-danger`}>Eliminar Todos</button>
      </div>
      <div className={estilos.consultas}>
        {consultas_resultados &&
          consultas_resultados.length > 0 &&
          consultas_resultados.map((consulta, index) => (
            <EntradaConsulta
              key={index}
              descripcion={consulta.descripcion}
              onClick={() => handleConsultaClick(consulta)}
              handleEliminarConsultaClick={() =>
                handleEliminarConsultaClick(consulta.id)
              }
            />
          ))}
      </div>
    </div>
  );
};
