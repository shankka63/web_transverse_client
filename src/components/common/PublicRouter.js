import Login from "../routes/Login";
import Register from "../routes/Register";
import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";


export default function PublicRouter() {

    return(
        <Switch>
            <Route exact path="/login">
                <Login/>
            </Route>

            <Route exact path="/register">
                <Register/>
            </Route>
            <Redirect to={"/login"}/>

        </Switch>
    )
}