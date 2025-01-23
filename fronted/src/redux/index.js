import { combineReducers } from "redux";
import  chatReducer from './reducer';

const rootReducer = combineReducers({
    chat: chatReducer, 
});

export default rootReducer;
