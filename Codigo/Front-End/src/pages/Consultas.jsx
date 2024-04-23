/* eslint-disable react/prop-types */
import { FormConsultas } from "../components/FormConsultas";
import { ResultadoConsulta } from "../components/ResultadoConsulta";
import { Sidebar } from "../components/Sidebar";
import estilos from "../styles/consultas.module.css";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import axios from "axios";
import { getDate } from "../Tools/getDate";

export const Consultas = ({ user }) => {
  const [displayBtn, setDisplayBtn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [detail, setDetail] = useState(null);
  const [crearClicked, setCrearClicked] = useState(false);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [consultas_resultados, setConsultas_resultados] = useState([]);
  const [widthSurpassed, setWidthSurpassed] = useState(
    window.innerWidth < 1330
  );

  const handleConsultaClick = (consulta) => {
    setDetail(consulta);
    console.log(consulta);
    setCrearClicked(false);
    setMostrarResultado(true);
  };

  const handleEliminarConsultaClick = (idConsulta) => {
    axios
      .get(
        `https://localhost:7296/api/Consultum/eliminarConsulta?correo=${user.email}&idConsulta=${idConsulta}`
      )
      .then((response) => {
        if (response.data) {
          setConsultas_resultados((prevConsultas) =>
            prevConsultas.filter((consulta) => consulta.id !== idConsulta)
          );
          if (detail && detail.id === idConsulta) {
            setDetail(null);
            setMostrarResultado(false);
          }
        }
      })
      .catch((error) => {
        console.error("Error eliminando consulta: ", error);
      });
  };

  const handleCrearConsulta = (consulta) => {
    axios
      .post(
        `https://localhost:7296/api/Consultum/crearConsulta?correo=${user.email}`,
        {
          descripcion: consulta.descripcion,
          presupuesto: consulta.presupuesto,
          tipo: consulta.tipo,
          fecha: getDate(),
        }
      )
      .then((response) => {
        setConsultas_resultados((prevConsultas) => [
          ...prevConsultas,
          response.data,
        ]);
        setDetail(response.data);
        console.log(response.data);
        setMostrarResultado(true);
      })
      .catch((error) => {
        console.error("Error creando consulta: ", error);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://localhost:7296/api/Consultum/getConsultasYResultadosUsuario?correo=${user.email}`
      )
      .then((response) => {
        setConsultas_resultados(response.data);
      })
      .catch((error) => {
        console.error("Error fetching consultas y resultados: ", error);
      });
  }, [user]);

  const handleSidebarClick = () => {
    setShowSidebar(true);
    setDisplayBtn(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1330) {
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
        consultas_resultados={consultas_resultados}
        setCrearClicked={setCrearClicked}
        setMostrarResultado={setMostrarResultado}
        handleEliminarConsultaClick={handleEliminarConsultaClick}
      />
      <main className={estilos.main}>
        {crearClicked && !mostrarResultado && (
          <FormConsultas onSubmit={handleCrearConsulta} user={user} />
        )}

        {detail &&
          mostrarResultado &&
          consultas_resultados.find(
            (consulta) => consulta.id === detail.id
          ) && (
            <ResultadoConsulta
              consulta={detail}
              setConsultas_resultados={setConsultas_resultados}
            />
          )}
      </main>
    </div>
  );
};
