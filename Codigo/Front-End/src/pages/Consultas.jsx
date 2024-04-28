/* eslint-disable react/prop-types */
import { FormConsultas } from "../components/FormConsultas";
import { ResultadoConsulta } from "../components/ResultadoConsulta";
import { Sidebar } from "../components/Sidebar";
import estilos from "../styles/consultas.module.css";
import { useContext, useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { ConsultaContext } from "../context/ConsultaContext";

export const Consultas = () => {
  const [displayBtn, setDisplayBtn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [consulta, setConsulta] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [widthSurpassed, setWidthSurpassed] = useState(
    window.innerWidth < 1870
  );
  const {
    listaConsultas,
    agregarConsulta,
    eliminarConsulta,
    eliminarConsultas,
    agregarConsultaResultado,
  } = useContext(ConsultaContext);

  const handleConsultaClick = (consulta) => {
    setConsulta(consulta);
    setMostrarResultado(true);
  };

  const handleSidebarClick = () => {
    setShowSidebar(true);
    setDisplayBtn(false);
  };

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
