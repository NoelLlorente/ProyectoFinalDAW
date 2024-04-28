/* eslint-disable react/prop-types */
import { FaRegTrashAlt } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
export const EntradaPost = ({
  descripcion,
  index,
  onClick,
  eliminarPost,
  handleModificarPost,
}) => {
  if (descripcion.length > 15) {
    descripcion = descripcion.substring(0, 15) + "...";
  }
  return (
    <>
      <div key={index}>
        <FiMessageSquare />
        <p onClick={onClick}>{descripcion}</p>
        <span>
          <button onClick={eliminarPost}>
            <FaRegTrashAlt />
          </button>
          <button onClick={handleModificarPost}>
            <FaRegEdit />
          </button>
        </span>
      </div>
    </>
  );
};
