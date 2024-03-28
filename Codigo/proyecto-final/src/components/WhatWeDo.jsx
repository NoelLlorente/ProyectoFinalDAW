/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/whatWeDoHome.module.css";
import { useState, useEffect, useRef } from "react";
import arrowsIcon from "../assets/img/icon_arrowsWhatWeDo.svg";
import relojIcon from "../assets/img/icon_relojWhatWeDo.svg";
import boxIcon from "../assets/img/icon_boxWhatWeDo.svg";

export const WhatWeDo = () => {
  const [isVisible, setIsVisible] = useState({
    block1: false,
    block2: false,
    block3: false,
  });
  const refOne = useRef(null);
  const refTwo = useRef(null);
  const refThree = useRef(null);

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
          className={`bloques ${isVisible.block1 ? "visible" : ""}`}
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
          className={`bloques ${isVisible.block2 ? "visible" : ""}`}
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
          className={`bloques ${isVisible.block3 ? "visible" : ""}`}
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
