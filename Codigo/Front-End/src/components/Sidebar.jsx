/* eslint-disable react/prop-types */
import estilos from "../styles/sidebar.module.css";
import { BiArrowFromRight } from "react-icons/bi";
import { EntradaConsulta } from "./EntradaConsulta";

/**
 * Este componente es el sidebar, aca llamamos a un componente que son las entradas de las consultas (EntradaConsulta).
 *
 * @function Sidebar
 * @memberof Consultas
 * @prop {boolean} showSidebar Es un booleano que nos manda el padre para indicarnos cuando se esta mostrando la sidebar.
 * @prop {setter} setShowSidebar Nos permite cambiar el estado de showSidebar a true o false.
 * @prop {setter} setDisplayBtn Nos permite cambiar el estado de displayBtn, cuando mostrar el botón y cuando no.
 * @prop {boolean} widthSurpassed Nos indica si se ha superado o no el tamaño de pantalla establecido.
 * @prop {Object[]} listaConsultas Es un array que contiene los objetos de cada consulta, osea cada consulta es un objeto. Este array nos viene del provider ConsultasProvider.
 * @prop {function} handleConsultaClick Es un funcion que se recibe desde el padre.
 * @prop {setter} setMostrarResultado Permite cambiar el estado de la variable mostrarResultado. Osea cuando se muestra otro componente (ResultadoConsultas) y cuando no.
 * @prop {function} eliminarConsulta Es una funcion que nos permite eliminar la consulta. Viene del provider ConsultasProvider.
 * @prop {function} eliminarConsultas Es una funcion que nos permite eliminar todas las consultas. Viene del provider ConsultasProvider.
 * @returns {JSX.Element} Se retorna el componente para ser renderizado
 */
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
  /**
   * En esta funcion se maneja el click del botón que oculta la sidebar.
   * @function handleClickMenuBtn
   * @returns {None} No retorna nada
   */
  const handleClickMenuBtn = () => {
    setShowSidebar(false);
    setDisplayBtn(true);
  };

  /**
   * Se maneja el click del botón crear de la sidebar.
   * @function handleClickCrear
   * @returns {None} No retorna nada
   */
  const handleClickCrear = () => {
    setMostrarResultado(false);
  };

  /**
   * Se maneja el click del botón eliminar todos de la sidebar.
   * Y se utiliza la funcion eliminarConsultas que nos traimos del provider, para eliminar todas las consultas tanto en la db como del provider.
   * @function handleClickEliminarTodos
   * @returns {None} No retorna nada
   */
  const handleClickEliminarTodos = () => {
    eliminarConsultas();
  };

  /**
   * Acá si tenemos consultas en listaConsultas se muestran componentes EntradaConsulta cada uno con los datos de la consulta.
   */
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
