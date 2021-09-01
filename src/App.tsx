import "./App.css";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Login } from "./components/login";
import { NavBar } from "./components/nav-bar";
import { useEffect, useState } from "react";
import { TodoList } from "./components/todo-list";
import { getUser, User } from "./indexDB";
import { Register } from "./components/register";
import { initiateAddUser, initiateLoginUser } from "./store/user";
import { useDispatch, useSelector } from "react-redux";

export type PartialUser = {
  userName: string;
  password: string;
};
function App() {
  const user = useSelector((state:any) => state).user
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(()=>{
  if(user.id){
    history.push('/app')
  }
  },[user]);
  const performRegisterAction = async (newUser: PartialUser) => {
    dispatch(initiateAddUser(newUser));
  };
  const performLoginAction = async (newUser: PartialUser) => {
    dispatch(initiateLoginUser(newUser));
  };

  console.log(user)
  return (
    <>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login"></Redirect>
          </Route>
          <Route path="/login">
            <Login performLoginAction={performLoginAction} />
          </Route>
          <Route path="/signup">
            <Register performRegisterAction={performRegisterAction} />
          </Route>
          <Route path="/app">
            {user.id ? <TodoList /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
