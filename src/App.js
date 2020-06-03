import React from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./components/routes/Home";
import Navbar from "./components/Navbar";
import {Layout} from 'antd';

function App() {
    return (
        <Layout>
            <Navbar/>

            <Layout.Content>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>

                    <Redirect to={"/"}/>
                </Switch>
            </Layout.Content>
        </Layout>
    );
}

export default App;
