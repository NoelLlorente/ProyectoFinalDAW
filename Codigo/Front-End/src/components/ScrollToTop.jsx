import { useState, useEffect } from "react";
import "../styles/scrollToTop.css"; // Asegúrate de que este archivo CSS esté correctamente vinculado

/**
 * Este componente nos mostrará en el DOM una circunferencia que contendrá dentro una flecha.
 * Cuando hagamos click en ella nos permitará subir al inicio de la página en la que nos encontremos.
 * @function ScrollToTop
 * @returns {JSX.Element} Se retorna el componente para renderizarlo
 */
export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Función para detectar el scroll del usuario
  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 100);
  };

  // Función para subir al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Limpieza del evento
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      {isVisible && <i className="fas fa-arrow-up"></i>}
    </div>
  );
};
