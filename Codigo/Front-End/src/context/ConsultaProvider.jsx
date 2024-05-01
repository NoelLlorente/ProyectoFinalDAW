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

/**
 * Se inicializa el estado en un array vacío
 */
const initialState = [];

/**
 * Este componente es el provider, osea acá se le da funcionalidad a toda la vista de Consultas,
 * en este provider se crean las consultas tanto en la db como en el initialState, también se eliminan las consultas, y se crean los resultados de cada consulta.
 * Básicamente si yo borro una consulta, se borra tanto del provider como de la db.
 *
 * @function ConsultaProvider
 * @memberof Consultas
 * @prop {Object} user Es el objeto que contiene los datos del usuario logueado.
 * @prop {array} children Serán los hijos de este componente.
 * @returns {JSX.Element} Se retorna el componente ConsultaContext.Provider con las funcionalidades de este provider.
 */
export const ConsultaProvider = ({ user, children }) => {
  /**
   * Se crea un reducer, osea en este reducer se realizarán las funciones sobre el initialState.
   *
   * @param {Array} state Es el estado inicial (initialState), osea un array vacio
   * @param {Object} action Será la acción, según está se realizará una cosa del switch.
   * @returns {State} Se retorna un estado.
   */
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

  /**
   * Llamamos al reducer que creamos anteriormente y obtenemos la lista de consultas y el dispatch
   */
  const [listaConsultas, dispatch] = useReducer(consultasReducer, initialState);

  /**
   * Este useEffect se ejecutará cada vez que cambie el objeto usuario, osea cada vez que sea un usuario distinto.
   * Acá se cargan las consultas de la db, y se realiza el dispatch que cambiará los datos en el estado initialState o mejor dicho listaConsultas.
   */
  useEffect(() => {
    if (user) {
      const cargarConsultas = async () => {
        const datos = await getConsultas(user.email);
        dispatch({ type: "[CONSULTA] Cargar Consultas", payload: datos });
      };
      cargarConsultas();
    }
  }, [user]);

  /**
   * Es una función que nos permitirá crear una consulta, y añadirla a la db y a la listaConsultas.
   * Como se puede ver se llama a una función createConsulta, esta función es la que se encarga se llamar a un api pasandole los datos, y estos se guardarán en la db.
   *
   * @param {Object} consulta Es el objeto que contiene los datos de la consulta que se va a añadir a la db y a la listaConsultas.
   * @returns {number} Se retorna el id de la consulta que se ha creado en la db.
   */
  const agregarConsulta = async (consulta) => {
    const nuevaConsulta = await createConsulta(consulta, user.email);
    const action = {
      type: "[CONSULTA] Agregar Consulta",
      payload: nuevaConsulta,
    };
    dispatch(action);
    return nuevaConsulta.id;
  };

  /**
   * Es una función que nos permitirá eliminar una consulta dado un id, y eliminarla de la db y de la listaConsultas.
   * Como se puede ver se llama a una función deleteConsulta, esta función es la que se encarga de llamar a un api que realizará la eliminación de la db.
   *
   * @param {number} id Es el id de la consulta a eliminar
   * @returns {None} No retorna nada
   */
  const eliminarConsulta = async (id) => {
    await deleteConsulta(id, user.email);
    const action = {
      type: "[CONSULTA] Eliminar Consulta",
      payload: id,
    };
    dispatch(action);
  };

  /**
   * Es una función que nos permitirá eliminar todas las consultas, tanto de la db, como de la listaConsultas.
   * Como se puede ver se llama a una función deleteConsultas, esta función es la que se encarga se llamar a un api que realizará la eliminación de la db.
   *
   * @returns {None} No retorna nada
   */
  const eliminarConsultas = async () => {
    await deleteConsultas(user.email);
    const action = {
      type: "[CONSULTA] Eliminar Consultas",
    };
    dispatch(action);
  };

  /**
   * Es una función que nos permitirá agregar el resultado obtenido de la IA a una consulta, obviamente este se agregará a la db y a la listaConsultas.
   * Como se puede ver se llama a una función addConsultaResultado, esta función es la que se encarga se llamar a un api nos devolverá el resultado, y le agregará a la db.
   * @param {Object} consulta Es el objeto que contiene los datos de la consulta.
   * @returns {None} No retorna nada
   */
  const agregarConsultaResultado = async (consulta) => {
    const resultado = await addConsultaResultado(consulta);
    const action = {
      type: "[CONSULTA] Agregar Consulta Resultado",
      payload: resultado,
    };

    dispatch(action);
  };

  /**
   * Se retorna este Provider con sus funcionalidades y la listaConsultas.
   */
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
