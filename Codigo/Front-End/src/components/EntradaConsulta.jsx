/* eslint-disable react/prop-types */
import { FaRegTrashAlt } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
export const EntradaConsulta = ({
  descripcion,
  index,
  onClick,
  handleEliminarConsultaClick,
}) => {
  return (
    <>
      <p key={index} onClick={onClick}>
        <FiMessageSquare />
        {descripcion}
        <FaRegTrashAlt onClick={handleEliminarConsultaClick} />
      </p>
    </>
  );
};
