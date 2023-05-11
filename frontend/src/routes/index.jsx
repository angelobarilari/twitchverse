import { Switch, Route } from "react-router-dom";
import Home from "../pages/home";

function Routes() {
    return (
        <>
            <Switch>
                <Route exact path="/home">
                    <Home />
                </Route>
            </Switch>
        </>
    );
}

export default Routes;
