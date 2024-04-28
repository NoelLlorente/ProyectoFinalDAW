/* eslint-disable react/prop-types */
import estilos from "../styles/sidebar.module.css";
import { BiArrowFromRight } from "react-icons/bi";
import { EntradaConsulta } from "./EntradaConsulta";
export const Sidebar = ({
  showSidebar,
  setShowSidebar,
  setDisplayBtn,
  widthSurpassed,
  listaConsultas,
  handleConsultaClick,
  setMostrarResultado,
  eliminarConsulta,
  eliminarConsultas,
}) => {
  const handleClickMenuBtn = () => {
    setShowSidebar(false);
    setDisplayBtn(true);
  };

  const handleClickCrear = () => {
    setMostrarResultado(false);
  };

  const handleClickEliminarTodos = () => {
    eliminarConsultas();
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
        <button className={`btn btn-danger`} onClick={handleClickEliminarTodos}>
          Eliminar Todos
        </button>
      </div>
      <div className={estilos.consultas}>
        {listaConsultas &&
          listaConsultas.length > 0 &&
          listaConsultas.map((consulta, index) => (
            <EntradaConsulta
              key={index}
              descripcion={consulta.descripcion}
              onClick={() => handleConsultaClick(consulta)}
              eliminarConsulta={() => eliminarConsulta(consulta.id)}
            />
          ))}
      </div>
    </div>
  );
};
