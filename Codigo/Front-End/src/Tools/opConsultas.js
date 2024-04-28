import axios from "axios";
import { getDate } from "./getDate";
import { getAIResponse } from "./getAIResponse";

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
