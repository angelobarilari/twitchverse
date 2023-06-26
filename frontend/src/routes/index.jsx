import { Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import Test from "../pages/test";

function Routes() {
    return (
        <>
            <Switch>
                <Route exact path="/home">
                    <Home />
                </Route>

                <Route exact path="/test">
                    <Test />
                </Route>
            </Switch>
        </>
    );
}

export default Routes;
