import * as React from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export default class Home extends React.Component{

    render() {
        return(
            <div>
                Salut les poulettes
                <CheckConfig/>
            </div>
        )
    }
}


function CheckConfig() {
    const rep = useQuery(GET_GRAPHQL_INFO);

    if (rep.loading) return <span className="status-warning">LOADING</span>;
    console.log(rep)
    if (rep.error) return <span className="status-error">ERROR</span>;
    console.log(rep.data)
    return <span className="status-ok">OK</span>;
}

const GET_GRAPHQL_INFO = gql`
  query {
  crews {
    name
  }
}
`;