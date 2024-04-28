/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import estilos from "../styles/formPosts.module.css";
export const FormPosts = ({
  agregarPost,
  setPost,
  setMostrarPost,
  postAModificar,
  modificarPost,
}) => {
  const [descripcion, setDescripcion] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    if (postAModificar) {
      setDescripcion(postAModificar.descripcion);
      setIsUpdateMode(true);
    }
  }, [postAModificar]);

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
