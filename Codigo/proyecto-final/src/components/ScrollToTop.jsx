import { useState, useEffect } from "react";
import "../styles/scrollToTop.css"; // Asegúrate de que este archivo CSS esté correctamente vinculado

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
