import React from 'react';
import './App.css';

import {ApolloProvider} from "@apollo/react-hooks";

import ApolloClient, {InMemoryCache} from 'apollo-boost';
import AuthenticatedRouter from "./components/common/AuthenticatedRouter";
import PublicRouter from "./components/common/PublicRouter";


const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

function App() {
    const token = localStorage.getItem("authToken");


    if (!token) {
        return (
            <ApolloProvider client={client}>
                <PublicRouter/>
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
            <AuthenticatedRouter/>
        </ApolloProvider>
    );
}

export default App;
