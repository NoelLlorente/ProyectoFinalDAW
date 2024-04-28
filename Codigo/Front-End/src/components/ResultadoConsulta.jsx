/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import estilos from "../styles/resultadoConsulta.module.css";

export const ResultadoConsulta = ({ consulta }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (consulta.resultadoConsulta) {
      setLoading(false);
    }
  }, [consulta]);
  return (
    <>
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <div className={`container ${estilos.contenedor_resultado}`}>
          {consulta.resultadoConsulta && (
            <ReactMarkdown>
              {consulta.resultadoConsulta.resultado}
            </ReactMarkdown>
          )}
        </div>
      )}
    </>
  );
};
