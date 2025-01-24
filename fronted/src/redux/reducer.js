import {
  FETCH_MESSAGES,
  FETCH_MESSAGES_FAIL,
  SEND_MESSAGE,
  SEND_MESSAGE_FAIL,
} from "../redux/actions";

const initialstate = {
  messages: [],
  error: null,
};

const chatReducer = (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_MESSAGES:
      return { ...state,
         messages: action.payload,
          error: null
    };
    case FETCH_MESSAGES_FAIL:
      return { ...state,
         error: action.payload 
    };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case SEND_MESSAGE_FAIL:
      return { ...state,
        error: action.payload 
    };
    default:
      return state;
  }
};

export default chatReducer;
