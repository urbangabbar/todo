import { User } from "../indexDB";

export const LOGIN = "LOGIN";
export const UPDATE_TODO = "UPDATE_TODO";

export const loginUser = (payload:any) => {
  return {
    type: LOGIN,
    payload
  };
};

export const updateTask = (payload:any) => {
    return {
      type: UPDATE_TODO,
      payload
    };
  };

const INITIAL_STATE = {};

const reducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_TODO:
        return{
            ...state,
            todoList: action.payload
        }
    default:
      return state;
  }
};

export default reducer;
