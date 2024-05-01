/* eslint-disable react/prop-types */
import { FormConsultas } from "../components/FormConsultas";
import { ResultadoConsulta } from "../components/ResultadoConsulta";
import { Sidebar } from "../components/Sidebar";
import estilos from "../styles/consultas.module.css";
import { useContext, useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { ConsultaContext } from "../context/ConsultaContext";

/**
 * Este componente esta la vista de consultas, acá se utiliza el provider ConsultaContext (useContext), para realizar las funcionalidades necesarios.
 * Acá se llaman a otros componentes como son el FormConsultas, ResultadoConsultas y el Sidebar.
 * @namespace Consultas
 * @returns {JSX.Element} Se retorna el componente para ser renderizado
 */
export const Consultas = () => {
  /**
   * Se crean los useState cada uno con su propiedad y su setter.
   */
  const [displayBtn, setDisplayBtn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [consulta, setConsulta] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [widthSurpassed, setWidthSurpassed] = useState(
    window.innerWidth < 1870
  );
  /**
   * Se obtienen las funcionalidades del provider ConsultaProvider
   */
  const {
    listaConsultas,
    agregarConsulta,
    eliminarConsulta,
    eliminarConsultas,
    agregarConsultaResultado,
  } = useContext(ConsultaContext);

  /**
   * Esta función se utiliza cuando hacemos click en alguna consulta del sidebar.
   * Se utiliza el setter de la prop consulta, para hacer que la prop obtenga los datos de la consulta cliqueada.
   * @param {Object} consulta Es el objeto que recibe la funcion con los datos de la consulta cliqueada
   * @returns {None} No devuelve nada
   */
  const handleConsultaClick = (consulta) => {
    setConsulta(consulta);
    setMostrarResultado(true);
  };

  /**
   * Este función maneja que cuando hagamos click en un botón para desplegar u ocultar la sidebar utilice los setters de las props.
   * @returns {None} No devuelve nada
   */
  const handleSidebarClick = () => {
    setShowSidebar(true);
    setDisplayBtn(false);
  };

  /**
   * Se utiliza el useEffect para manejar cuando ocultar la sidebar según el tamaño de la ventana y cuando ocultarla.
   * Además de cuando mostrar el botón y cuando ocultarlo
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1870) {
        setWidthSurpassed(true);
        setDisplayBtn(true);
        setShowSidebar(false);
      } else {
        setWidthSurpassed(false);
        setDisplayBtn(false);
        setShowSidebar(true);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * Se retorna el componente, junto con las llamadas a otros componentes que se van a renderizar en este.
   * Como se puede observar estos componentes reciben muchas props y setters.
   */
  return (
    <div className={`container-fluid ${estilos.contenedor_consultas}`}>
      {displayBtn && (
        <button
          className={`btn btn-primary ${estilos.btn_abrirSidebar}`}
          onClick={handleSidebarClick}
        >
          <MdMenu />
        </button>
      )}
      <Sidebar
        showSidebar={showSidebar}
        widthSurpassed={widthSurpassed}
        setDisplayBtn={setDisplayBtn}
        setShowSidebar={setShowSidebar}
        handleConsultaClick={handleConsultaClick}
        listaConsultas={listaConsultas}
        eliminarConsulta={eliminarConsulta}
        setMostrarResultado={setMostrarResultado}
        eliminarConsultas={eliminarConsultas}
      />
      <main className={estilos.main}>
        {!mostrarResultado && (
          <FormConsultas
            agregarConsulta={agregarConsulta}
            setMostrarResultado={setMostrarResultado}
            setConsulta={setConsulta}
            agregarConsultaResultado={agregarConsultaResultado}
          />
        )}

        {consulta &&
          mostrarResultado &&
          (() => {
            const consul = listaConsultas.find(
              (consul) => consul.id === consulta.id
            );
            return consul && <ResultadoConsulta consulta={consul} />;
          })()}
      </main>
    </div>
  );
};
