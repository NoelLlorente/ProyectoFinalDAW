/* eslint-disable react/prop-types */
import { FaRegTrashAlt } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
export const EntradaConsulta = ({
  descripcion,
  index,
  onClick,
  eliminarConsulta,
}) => {
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
