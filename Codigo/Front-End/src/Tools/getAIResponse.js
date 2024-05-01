import axios from "axios";

/**
 * Esta función llama al api rest de https://groq.com/, y nos genera una IA la respuesta a nuestra consulta.
 * Este función se utiliza en la función del que se llama en el provider {@link addConsultaResultado}.
 * Acá como se puede ver le paso un mensaje muy largo como role system, pues en este mensaje le estoy indicando al modelo IA,
 * como quiero que me responda con los datos que le estoy pasando al api rest.
 * También más abajo se puede apreciar un campo model, pues en este campo se indica el modelo IA que va a generarme una respuesta (El nuevo LLama3 de Meta).
 *
 * @param {string} descripcion Es la descripción de la consulta
 * @param {*} presupuesto Es el presupuesto de la consulta
 * @returns {Promise<Object>} Se devuelve una promesa que contiene la respuesta a la consulta que ha sido generada por el modelo Llama3
 */
export const getAIResponse = async (descripcion, presupuesto) => {
  const data = {
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente virtual, potenciado por inteligencia artificial, con especialización en consultoría estratégica para emprendimientos. Tu objetivo principal es empoderar a los usuarios para transformar sus ideas innovadoras en negocios prósperos. Al recibir la descripción detallada de un proyecto empresarial junto con el presupuesto estimado del usuario, proporcionarás:\nUna hoja de ruta personalizada: Esta incluirá pasos estratégicos y un cronograma detallado para la implementación efectiva del proyecto.\nUn análisis detallado del presupuesto: Identificarás las áreas clave de inversión y sugerirás oportunidades para maximizar el ahorro.\nUna evaluación exhaustiva de la viabilidad: Realizarás un análisis integral que incluye el estudio del mercado, la competencia, los riesgos potenciales y las probabilidades de éxito. Además, proporcionarás recomendaciones estratégicas para mejorar estas probabilidades.Como parte de esta evaluación, calculas una probabilidad de éxito en base al 100%, que representa una estimación cuantitativa de la viabilidad del proyecto.\nAdemás, brindarás asesoramiento experto sobre estrategias de marketing efectivas, gestión eficiente de recursos y adaptación a las tendencias cambiantes del mercado. Tu orientación será esencial para que el usuario tome decisiones informadas y optimice sus recursos, allanando el camino hacia el éxito empresarial. Tu función es ser un aliado estratégico en el viaje emprendedor del usuario.",
      },
      {
        role: "user",
        content: `${descripcion}, y cuento con ${presupuesto} euros`,
      },
    ],
    model: "llama3-70b-8192",
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
  };

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AUTH0_GROQCHAT_TOKEN}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error al cargar respuesta desde Modelo IA: " + error);
  }
};
