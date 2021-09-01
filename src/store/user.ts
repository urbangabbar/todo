import { PartialUser } from "../App";
import { addUserToDb, getUser } from "../indexDB";
import { loginUser } from "./user-reducer";

export const initiateAddUser = (user: PartialUser) => {
  return (dispatch: Function) => {
    addUserToDb(user).then(async () => {
      const loggedInUser = await getUser(user.userName, user.password);
      dispatch(loginUser(loggedInUser));
    });
  };
};

export const initiateLoginUser = (user: PartialUser) => {
  return async (dispatch: Function) => {
    const loggedInUser = await getUser(user.userName, user.password);
    dispatch(loginUser(loggedInUser));
  };
};
