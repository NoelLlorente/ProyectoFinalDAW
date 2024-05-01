/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import IA from "../assets/img/img_inteligenciaArtificial.jpg";
import pasos from "../assets/img/img_pasosPracticos.webp";
import presupuesto from "../assets/img/img_presupuesto.webp";
import probabilidad from "../assets/img/img_probabilidad.jpg";

/**
 * Este es el componente de la sección EnfoqueSobreNosotros.
 * Este componente se mostrará en la vista SobreNosotros.
 * Acá se entra más en profundidad en explicar el concepto del sitio web.
 *
 * @prop {Object} estilos - Serán los estilos del css
 * @function EnfoqueSobreNosotros
 * @memberof SobreNosotros
 * @returns {JSX.Element} El componente Renderizado
 */
export const EnfoqueSobreNosotros = ({ estilos }) => {
  /**
   * Acá nos creamos un useRef para referenciar al DOM.
   */
  const cardsRef = useRef([]);

  /**
   * Utilizaremos un useEffect para animar las tarjetas, threshold será el tiempo de aparición o animación.
   * Este useEffect se volverá a correr cuando cambie la variable estilos.appear.
   */
  useEffect(() => {
    const cards = cardsRef.current;
    const appearOptions = {
      threshold: 0.2,
    };
    /**
     * Creamos el IntersectionObserver y le añadimos funcionalidad.
     */
    const appearOnScroll = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add(estilos.appear);
          }, index * 200); /** Es el retraso entre la aparición de cada tarjeta */
        }
      });
    }, appearOptions);

    /**
     * Hacemos que observe cada tarjeta
     */
    cards.forEach((card) => {
      appearOnScroll.observe(card);
    });

    return () => appearOnScroll.disconnect();
  }, [estilos.appear]);

  /**
   * Acá se verán se indicará el orden de aparicion, osea que tarjeta aparecerá primero.
   * Se retorna todo el componente con el html.
   */
  return (
    <div className={`container-fluid ${estilos.enfoque}`}>
      <h3>Nuestro Enfoque</h3>
      <div className={estilos.contenedorEnfoques}>
        <div ref={(el) => (cardsRef.current[0] = el)} className={estilos.card}>
          <img src={IA} alt="imagen IA" />
          <h5>Inteligencia Artificial</h5>
          <p>
            Nuestra plataforma utiliza algoritmos avanzados para analizar tus
            ideas y proporcionarte recomendaciones específicas. No creemos en
            soluciones genéricas, cada proyecto es único y merece una estrategia
            personalizada.
          </p>
        </div>
        <div ref={(el) => (cardsRef.current[1] = el)} className={estilos.card}>
          <img src={pasos} alt="imagen pasos prácticos" />
          <h5>Pasos Prácticos</h5>
          <p>
            ¿Cuáles son los pasos concretos para llevar a cabo tu idea? Te lo
            diremos. Desde la planificación hasta la ejecución, te acompañaremos
            en cada etapa.
          </p>
        </div>
        <div ref={(el) => (cardsRef.current[2] = el)} className={estilos.card}>
          <img src={presupuesto} alt="imagen presupuesto" />
          <h5>Presupuesto Realista</h5>
          <p>
            Sabemos que los recursos son limitados. Te ayudaremos a estimar los
            costos y a tomar decisiones informadas.
          </p>
        </div>
        <div ref={(el) => (cardsRef.current[3] = el)} className={estilos.card}>
          <img src={probabilidad} alt="imagen probabilidad" />
          <h5>Probabilidades de Éxito</h5>
          <p>
            No te prometemos el éxito instantáneo, pero te proporcionaremos una
            evaluación realista de las posibilidades. El viaje puede ser
            desafiante, pero estamos aquí para apoyarte.
          </p>
        </div>
      </div>
    </div>
  );
};
