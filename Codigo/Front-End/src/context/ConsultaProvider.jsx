/* eslint-disable react/prop-types */
import { useEffect, useReducer } from "react";
import {
  addConsultaResultado,
  createConsulta,
  deleteConsulta,
  deleteConsultas,
  getConsultas,
} from "../Tools/opConsultas";
import { ConsultaContext } from "./ConsultaContext";

const initialState = [];

export const ConsultaProvider = ({ user, children }) => {
  const consultasReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case "[CONSULTA] Cargar Consultas":
        return action.payload;
      case "[CONSULTA] Agregar Consulta":
        return [...state, action.payload];
      case "[CONSULTA] Eliminar Consulta":
        return state.filter((consulta) => consulta.id !== action.payload);
      case "[CONSULTA] Agregar Consulta Resultado":
        return state.map((consulta) => {
          if (consulta.id === action.payload.idconsulta) {
            return {
              ...consulta,
              resultadoConsulta: action.payload,
            };
          }
          return consulta;
        });
      case "[CONSULTA] Eliminar Consultas":
        return [];
      default:
        return state;
    }
  };

  const [listaConsultas, dispatch] = useReducer(consultasReducer, initialState);

  useEffect(() => {
    if (user) {
      const cargarConsultas = async () => {
        const datos = await getConsultas(user.email);
        dispatch({ type: "[CONSULTA] Cargar Consultas", payload: datos });
      };
      cargarConsultas();
    }
  }, [user]);

  const agregarConsulta = async (consulta) => {
    const nuevaConsulta = await createConsulta(consulta, user.email);
    const action = {
      type: "[CONSULTA] Agregar Consulta",
      payload: nuevaConsulta,
    };
    dispatch(action);
    return nuevaConsulta.id;
  };

  const eliminarConsulta = async (id) => {
    await deleteConsulta(id, user.email);
    const action = {
      type: "[CONSULTA] Eliminar Consulta",
      payload: id,
    };
    dispatch(action);
  };

  const eliminarConsultas = async () => {
    await deleteConsultas(user.email);
    const action = {
      type: "[CONSULTA] Eliminar Consultas",
    };
    dispatch(action);
  };

  const agregarConsultaResultado = async (consulta) => {
    const resultado = await addConsultaResultado(consulta);
    const action = {
      type: "[CONSULTA] Agregar Consulta Resultado",
      payload: resultado,
    };

    dispatch(action);
  };

  return (
    <ConsultaContext.Provider
      value={{
        listaConsultas,
        agregarConsulta,
        eliminarConsulta,
        eliminarConsultas,
        agregarConsultaResultado,
      }}
    >
      {children}
    </ConsultaContext.Provider>
  );
};
