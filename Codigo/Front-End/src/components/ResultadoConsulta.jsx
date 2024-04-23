/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

export const ResultadoConsulta = ({ consulta, setConsultas_resultados }) => {
  const [loading, setLoading] = useState(true);
  const [resultado, setResultado] = useState(null);
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateLorem = () => {
    const loremIpsum =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.";
    const length = getRandomInt(20, loremIpsum.length);
    return loremIpsum.substring(0, length);
  };

  useEffect(() => {
    if (consulta && !consulta.resultadoConsultum) {
      const loremGenerated = generateLorem();
      const newGenerar = {
        pasos: loremGenerated,
        presupuestoEstimado: loremGenerated,
        probabilidad: loremGenerated,
        idConsulta: consulta.id,
      };
      setResultado(newGenerar);

      const delay = getRandomInt(5000, 10000);
      setTimeout(async () => {
        setLoading(false);

        const response = await axios.post(
          "https://localhost:7296/api/ResultadoConsultum/crearResultadoConsulta",
          newGenerar
        );
        setConsultas_resultados((prevConsultas) => {
          return prevConsultas.map((item) =>
            item.Id === consulta.Id
              ? { ...item, resultadoConsultum: response.data }
              : item
          );
        });
      }, delay);
    } else if (consulta && consulta.resultadoConsultum) {
      setResultado(consulta.resultadoConsultum);
    }
  }, [consulta]);

  if (loading) {
    return <div>Cargando...</div>; // Muestra una barra o círculo de carga
  } else {
    return (
      <div>
        <div>
          Pasos:
          {resultado ? resultado.pasos : ""}
        </div>
        <div>
          Presupuesto Estimado:
          {resultado ? resultado.presupuestoEstimado : ""}
        </div>
        <div>
          Probabilidad:
          {resultado ? resultado.probabilidad : ""}
        </div>
      </div>
    );
  }
};
