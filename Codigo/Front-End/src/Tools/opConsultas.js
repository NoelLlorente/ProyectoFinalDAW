import axios from "axios";
import { getDate } from "./getDate";
import { getAIResponse } from "./getAIResponse";

/**
 * Esta es la función que se llama en el provider {@link Consultas.ConsultaProvider} para cargar las consultas.
 * En esta función se llama a mi api rest pasandole el email del usuario para cargar todas las consultas de la db.
 *
 * @function getConsultas
 * @param {string} email Es el correo del usuario logueado.
 * @returns {Promise<Object>} Se retorna una promesa que contiene un array de objetos.
 */
export const getConsultas = async (email) => {
  try {
    const response = await axios.get(
      `https://localhost:7296/api/Consultum/getConsultasYResultadosUsuario?correo=${email}`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error al cargar los datos de las consultas: " + error);
  }
};

/**
 * Esta es la función que se llama en el provider {@link Consultas.ConsultaProvider} para crear las consultas.
 * En esta función se llama a mi api rest pasandole el email del usuario, y los datos de la consulta, para crear la consulta en la db.
 * También en esta función se ve como llamamos al getDate(), esta es una función que nos devuelve la fecha y hora actual en un formato que la db entiende.
 *
 * @function createConsulta
 * @param {Object} consulta Es el objeto que contiene los datos de la consulta
 * @param {string} email Es el correo del usuario logueado.
 * @returns {Promise<Object>} Se retorna una promesa que contiene el objeto.
 */
export const createConsulta = async (consulta, email) => {
  try {
    const response = await axios.post(
      `https://localhost:7296/api/Consultum/crearConsulta?correo=${email}`,
      {
        descripcion: consulta.descripcion,
        presupuesto: consulta.presupuesto,
        tipo: consulta.tipo,
        fecha: getDate(),
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error al crear consulta: " + error);
  }
};

/**
 * Esta es la función que se llama en el provider {@link Consultas.ConsultaProvider} para eliminar una consulta.
 * En esta función se llama a mi api rest pasandole el email del usuario, y el id de la consulta, para eliminar la consulta en la db.
 *
 * @function deleteConsulta
 * @param {number} id Es el id de la consulta a eliminar
 * @param {string} email Es el correo del usuario logueado.
 * @returns {Promise<Object>} Se retorna una promesa que contiene el objeto.
 */
export const deleteConsulta = async (id, email) => {
  try {
    const response = await axios.get(
      `https://localhost:7296/api/Consultum/eliminarConsulta?correo=${email}&idConsulta=${id}`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error al eliminar la consulta: " + error);
  }
};

/**
 * Esta es la función que se llama en el provider {@link Consultas.ConsultaProvider} para eliminar todas las consultas.
 * En esta función se llama a mi api rest pasandole el email del usuario, para eliminar las consultas en la db.
 *
 * @function deleteConsultas
 * @param {string} email Es el correo del usuario logueado.
 * @returns {Promise<Object>} Se retorna una promesa que contiene el objeto.
 */
export const deleteConsultas = async (email) => {
  try {
    const response = await axios.get(
      `https://localhost:7296/api/Consultum/eliminarConsultas?correo=${email}`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error al eliminar las consultas: " + error);
  }
};

/**
 * Esta es la función que se llama en el provider {@link Consultas.ConsultaProvider} para obtener el resultado de la consulta.
 * Se obtiene el resultado de la IA llamando a la funcion getAIResponse, a la cual le pasamos la descripcion de la consulta y el presupuesto.
 * En esta función se llama a mi api rest pasandole el resultado de la consulta (generado por IA), y el id de la consulta, todo esto para ser agregado en la db, en su respectiva consulta.
 *
 * @function addConsultaResultado
 * @param {Object} consulta Es el objeto que contiene los datos de la consulta.
 * @returns {Promise<Object>} Se retorna una promesa que contiene el objeto.
 */
export const addConsultaResultado = async (consulta) => {
  try {
    const responseAI = await getAIResponse(
      consulta.descripcion,
      consulta.presupuesto
    );
    if (responseAI) {
      const response = await axios.post(
        "https://localhost:7296/api/ResultadoConsultum/crearResultadoConsulta",
        {
          Resultado: responseAI,
          Idconsulta: consulta.id,
        }
      );
      const data = await response.data;
      return data;
    }
  } catch (error) {
    console.log("Error al guardar resultado de la IA: " + error);
  }
};
