/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import estilos from "../styles/resultadoConsulta.module.css";

/**
 * Este componente se utiliza para mostrar el resultado de una consulta tanto creado, como a la que se le hace click en la sidebar.
 * @function ResultadoConsulta
 * @memberof Consultas.
 * @prop {Object} consulta Es el objeto que contiene la consulta que se ha creado o cliqueado en el sidebar.
 * @returns {JSX.Element} Se retorna el componente
 */
export const ResultadoConsulta = ({ consulta }) => {
  /**
   * Se crea una prop o estado para saber si esta cargando todavia la creacion del resultado de la consulta.
   */
  const [loading, setLoading] = useState(true);

  /**
   * Este useEffect se llama cada vez que cambie el objeto consulta, osea que hasta que no se obtengo resultadoConsulta se mostrará la página el mensaje Cargando...
   */
  useEffect(() => {
    if (consulta.resultadoConsulta) {
      setLoading(false);
    }
  }, [consulta]);

  /**
   * Se utiliza un funcionalidad que es un componente React.Markdown para convertir de markdown a html,
   * esto porque lo que me devuelve la IA esta en markdown, entonces me toca convertirlo a html.
   */
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
