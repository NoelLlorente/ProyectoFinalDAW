/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/whatWeDoHome.css";
import { useState, useEffect, useRef } from "react";
import arrowsIcon from "../assets/img/icon_arrowsWhatWeDo.svg";
import relojIcon from "../assets/img/icon_relojWhatWeDo.svg";
import boxIcon from "../assets/img/icon_boxWhatWeDo.svg";

/**
 * Es es el componente WhatWeDo del Home, en esta sección se hablará de lo que hacemos.
 * @function WhatWeDo
 * @memberof Home
 * @returns {JSX.Element} El componente renderizado
 */
export const WhatWeDo = () => {
  /**
   * Creamos el estado isVisible, y su setter, con tres bloques.
   * Estos 3 bloques tiene una animación por eso utilizaremos el useState, para manejar cuando son visibles y cuando no.
   */
  const [isVisible, setIsVisible] = useState({
    block1: false,
    block2: false,
    block3: false,
  });

  /**
   * Creamos tres useRef que se utilizan para almacenar referencias a elementos del DOM.
   * Estas referencias se utilizan para observar si los bloques están visibles en la pantalla mediante IntersectionObserver.
   */
  const refOne = useRef(null);
  const refTwo = useRef(null);
  const refThree = useRef(null);

  /**
   * Utilizamos un useEffect, para configurar el IntersectionObserver.
   * Cuando los bloques son visibles en la pantalla, se actualiza el estado isVisible para mostrarlos.
   * El useEffect solo ocurrirá una vez.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 1.0 }
    );

    observer.observe(refOne.current);
    observer.observe(refTwo.current);
    observer.observe(refThree.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="container-fluid contenedor_whatWeDo">
      <section className="seccion_intro">
        <h3>QUÉ HACEMOS</h3>
        <p>ESTO ES ALGO DE LO QUE HACEMOS</p>
      </section>
      <section className="seccion_bloques">
        <div
          id="block1"
          className={`bloques ${
            isVisible.block1 ? "visible" : ""
          }`} /** Se muestra el bloque si isVisible es true */
          ref={refOne}
        >
          <img src={relojIcon} />
          <h5>Generación de Plan de Negocio</h5>
          <p>
            Introduce tu idea y deja que nuestra IA elabore un plan de negocio
            detallado. Obtendrás un camino claro a seguir, con pasos
            personalizados para llevar tu proyecto desde el concepto hasta la
            realidad.
          </p>
        </div>
        <div
          id="block2"
          className={`bloques ${
            isVisible.block2 ? "visible" : ""
          }`} /** Se muestra el bloque si isVisible es true */
          ref={refTwo}
        >
          <img src={arrowsIcon} />
          <h5>Cálculo de Presupuesto Inteligente</h5>
          <p>
            ¿Preocupado por los costos? Nuestra herramienta analiza tu idea y
            proporciona una estimación de presupuesto realista. Planifica tu
            inversión con confianza, sabiendo que tienes la información
            financiera que necesitas para avanzar.
          </p>
        </div>
        <div
          id="block3"
          className={`bloques ${
            isVisible.block3 ? "visible" : ""
          }`} /** Se muestra el bloque si isVisible es true */
          ref={refThree}
        >
          <img src={boxIcon} />
          <h5>Análisis de Probabilidades de Éxito</h5>
          <p>
            Evalúa el potencial de éxito de tu idea con nuestro análisis
            predictivo. Nuestra IA examina múltiples factores para darte una
            visión objetiva de las posibilidades de éxito de tu negocio en el
            mercado actual.
          </p>
        </div>
      </section>
    </div>
  );
};
