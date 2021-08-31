import "./App.css";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Login } from "./components/login";
import { NavBar } from "./components/nav-bar";
import { useState } from "react";
import { TodoList } from "./components/todo-list";

export type User = {
  userName: string;
  password?: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const history = useHistory();

  const performLoginAction = (newUser: User) => {
    delete newUser.password;
    setUser(newUser);
    history.push("/app");
  };

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
          <Route path="/signup">Signup</Route>
          <Route path="/app">
            {user ? <TodoList />: <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
