/* eslint-disable react/prop-types */
import { FaRegTrashAlt } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

/**
 * Este componente es el que se muestra en el {@link Blog.SidebarBlog}, basicamente son los posts que realiza el usuario.
 * Acá como se puede ver tenemos 3 botones, uno que abre el {@link Blog.PanelPost} con los datos del post cliqueado,
 * el de eliminar que elimina ese post, y el de modificar que nos abrirá el componente FormPosts con los datos de posts para modificarle.
 *
 * @function EntradaPost
 * @prop {string} descripcion Es un string con la descripción del post.
 * @prop {number} index Es el id del post.
 * @prop {function} onClick Es una función que se utilizará para manejar el click en el párrafo que tiene la descripción.
 * @prop {function} eliminarPost Es una función del provider del {@link Blog.PostProvider} que nos permitirá eliminar el post.
 * @prop {function} handleModificarPost Es una función que se pasa desde el padre {@link Blog.SidebarBlog}, que manejará cuando hagamos click en el botón de modificar.
 * @return {JSX.Element} Se retorna el componente.
 */
export const EntradaPost = ({
  descripcion,
  index,
  onClick,
  eliminarPost,
  handleModificarPost,
}) => {
  /**
   * Si la descripción del post es mayor a 15, entonces se mostrará solo hasta el carácter 15 y luego tres puntos suspensivos.
   */
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
