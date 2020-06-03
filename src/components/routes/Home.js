import * as React from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export default class Home extends React.Component{

    render() {
        return(
            <div style={{height: "100%"}}>
                Salut les poulettes
                <CheckConfig/>
            </div>
        )
    }
}


function CheckConfig() {
    const { loading, error, data, networkStatus } = useQuery(GET_GRAPHQL_INFO);

    if (loading) return <span className="status-warning">LOADING</span>;
    if (error) return <span className="status-error">ERROR</span>;
    console.log(data)
    return <span className="status-ok">OK</span>;
}

const GET_GRAPHQL_INFO = gql`
  {
  crews {
    name
  }
}
`;