import React from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./components/routes/Home";
import Profil from "./components/routes/Profil";
import Equipage from "./components/routes/Equipage";
import Navbar from "./components/Navbar";
import {Layout} from 'antd';

import {ApolloProvider} from "@apollo/react-hooks";

import ApolloClient, {InMemoryCache} from 'apollo-boost';
import Login from "./components/routes/Login";
import Register from "./components/routes/Register";


const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

function App() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        return (
            <ApolloProvider client={client}>
                <Switch>
                    <Route exact path="/login">
                        <Login/>
                    </Route>

                    <Route exact path="/register">
                        <Register/>
                    </Route>
                    <Redirect to={"/login"}/>

                </Switch>
            </ApolloProvider>
        );
    }

    const clientAuth = new ApolloClient({
        uri: 'http://localhost:4000/',
        cache: new InMemoryCache(),
        headers: {authorization: token}
    });

    return (
        <ApolloProvider client={clientAuth}>

            <Layout className="height-100">
                <Navbar className="height-100"/>

                <Layout.Content className="height-100">
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route exact path="/profil">
                            <Profil/>
                        </Route>
                        <Route exact path="/equipage">
                            <Equipage/>
                        </Route>

                        <Redirect to={"/"}/>
                    </Switch>
                </Layout.Content>
            </Layout>
        </ApolloProvider>
    );
}

export default App;
