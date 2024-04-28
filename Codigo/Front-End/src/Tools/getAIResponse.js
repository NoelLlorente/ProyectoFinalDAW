import axios from "axios";

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
