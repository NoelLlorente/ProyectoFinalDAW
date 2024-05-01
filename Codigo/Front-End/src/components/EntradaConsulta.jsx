/* eslint-disable react/prop-types */
import { FaRegTrashAlt } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

/**
 * Es un componente que se utiliza para mostrar consultas en el sidebar.
 * Este componente contiene un svg dentro que nos permite eliminar la consulta.
 * Se utiliza en el componente {@link Consultas.Sidebar}
 * @function EntradaConsulta
 * @prop {string} descripcion Es la descripcion de la consulta.
 * @prop {number} index Es el indice de la consulta.
 * @prop {function} onClick Es una función que maneja el click cuando se hace click en el párrafo.
 * @prop {function} eliminarConsulta Es una funcion que es del provider y nos permite eliminar la consulta tanto de la db como del provider.
 * @returns {JSX.Element} Se retorna el componente
 */
export const EntradaConsulta = ({
  descripcion,
  index,
  onClick,
  eliminarConsulta,
}) => {
  /**
   * Si la descripción supera la longitud de 25, entonces solo se muestra hasta el carácter 25 y luego tres puntos suspensivos.
   */
  if (descripcion.length > 25) {
    descripcion = descripcion.substring(0, 25) + "...";
  }
  return (
    <>
      <p key={index} onClick={onClick}>
        <FiMessageSquare />
        {descripcion}
        <FaRegTrashAlt onClick={eliminarConsulta} />
      </p>
    </>
  );
};
