import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import IA from "../assets/img/img_inteligenciaArtificial.jpg";
import pasos from "../assets/img/img_pasosPracticos.webp";
import presupuesto from "../assets/img/img_presupuesto.webp";
import probabilidad from "../assets/img/img_probabilidad.jpg";

export const EnfoqueSobreNosotros = ({ estilos }) => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    const appearOptions = {
      threshold: 0.2, // Cambia este valor según necesites
    };

    const appearOnScroll = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add(estilos.appear);
          }, index * 200); // Ajusta el retraso entre la aparición de cada tarjeta
        }
      });
    }, appearOptions);

    cards.forEach((card) => {
      appearOnScroll.observe(card);
    });

    return () => appearOnScroll.disconnect();
  }, [estilos.appear]);

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

EnfoqueSobreNosotros.propTypes = {
  estilos: PropTypes.object,
};
