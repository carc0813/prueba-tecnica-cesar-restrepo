import axios from "axios";

export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const FETCH_MESSAGES_FAIL = "FETCH_MESSAGES_FAIL";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const SEND_MESSAGE_FAIL = "SEND_MESSAGE_FAIL";


 // Petición al backend para obtener mensajes
export const fetch_messages = () => {
  return async (dispatch) => {
    try {
      // Petición al backend para obtener mensajes
      const response = await axios.get("http://localhost:3001/messages");
      // Dispatch de mensajes recuperados con éxito
      dispatch({
        type: FETCH_MESSAGES,
        payload: response.payload, // Mensajes obtenidos
      });
      return response;
    } catch (error) {
      // Dispatch en caso de error
      dispatch({
        type: FETCH_MESSAGES_FAIL,
        payload: error.response ? error.response.data : error.messages,
      });
      return Promise.reject(error);
    }
  };
};

// Acción para enviar un mensaje al chatbot
export const sendMessage = (input) => {
  return async (dispatch, getState) => {
    const state = getState(); // Obtén el estado global
    const userId = state.user?.id || 1; // Asegúrate de tener un userId válido
    try {
      const response = await axios.post(
        "http://localhost:3001/messages/chatbot",
        { userId, input }
      );
      dispatch({
        type: SEND_MESSAGE,
        payload: { content: input, sender: "user" },
      });
      dispatch({
        type: SEND_MESSAGE,
        payload: { content: response.data.response, sender: "bot" },
      });
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_FAIL,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};
