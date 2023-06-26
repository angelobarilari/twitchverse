import { Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";

function Routes() {
    return (
        <>
            <Switch>
                <Route exact path="/home">
                    <Home />
                </Route>

                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>

                <Route exact path="/login">
                    <Login />
                </Route>
            </Switch>
        </>
    );
}

export default Routes;
