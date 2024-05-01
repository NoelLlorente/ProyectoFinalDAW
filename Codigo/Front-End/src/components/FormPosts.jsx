/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import estilos from "../styles/formPosts.module.css";

/**
 * Este componente es el formulario que se utiliza tanto para crear posts, como para modificarles.
 *
 * @function FormPosts
 * @memberof Blog
 * @prop {function} agregarPost Es una función del Provider PostProvider, básicamente nos permite crear los post, estos se agregan a la db y al provider.
 * @prop {setter} setPost Se utiliza para cambiar el estado del post, básicamente podriamos cambiar los datos de un post, o almacenar uno.
 * @prop {setter} setMostrarPost Se utiliza para modificar el estado de mostrarPost. Se utiliza para establecer un boolean (true, false).
 * @prop {Object} postAModificar Si estamos con el formulario en modo de modificar entonces este objeto contendrá los datos del post a modificar, se utilizará para rellenar el formulario.
 * @prop {function} modificarPost Esta es una función que viene del provider, nos permitirá modificar le post tanto en el provider como en la db.
 * @returns {JSX.Element} Se retorna el componente.
 */
export const FormPosts = ({
  agregarPost,
  setPost,
  setMostrarPost,
  postAModificar,
  modificarPost,
}) => {
  /**
   * Se crean dos estados o propiedades.
   * Se utilizarán para validar el formulario y para saber si el formulario esta en modo modificar o en modo crear.
   */
  const [descripcion, setDescripcion] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  /**
   * Se utiliza el useEffect cada vez que cambie el postAModificar, si este contiene un objeto, entonces los inputs del form, pillarán los datos del post.
   */
  useEffect(() => {
    if (postAModificar) {
      setDescripcion(postAModificar.descripcion);
      setIsUpdateMode(true);
    }
  }, [postAModificar]);

  /**
   * Esta función se utiliza para crear un post, o para modificar un post.
   * @function FormPosts_handleSubmit
   * @param {Event} e Es el evento del formulario
   * @returns {None} No retorna nada.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!descripcion) {
      return;
    }

    const detail = {
      descripcion: descripcion,
    };
    let nuevoPost;
    if (isUpdateMode) {
      nuevoPost = await modificarPost(postAModificar.id, detail.descripcion);
    } else {
      nuevoPost = await agregarPost(detail);
    }
    setPost(nuevoPost);
    setMostrarPost(true);
  };

  /**
   * Se utiliza este useEffect para validar en tiempo real los campos del formulario.
   */
  useEffect(() => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  }, []);

  return (
    <div className={`container ${estilos.contenedorForm}`}>
      <form
        className={`needs-validation ${estilos.form}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <h2>Formulario Consultas</h2>
        <div className="mb-3">
          <label htmlFor="descripcionPost" className="form-label">
            Descripción del Post:
          </label>
          <textarea
            className="form-control"
            id="descripcionPost"
            rows="5"
            maxLength="500"
            style={{ resize: "none" }}
            placeholder="Breve descripción del post..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
          <div className="invalid-feedback">
            Por favor, proporciona una descripción.
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          {isUpdateMode ? "Actualizar Post" : "Crear Post"}
        </button>
      </form>
    </div>
  );
};
