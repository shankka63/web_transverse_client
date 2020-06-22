import * as React from "react";

import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {Card, Descriptions, Result, Skeleton} from "antd";
import StopOutlined from "@ant-design/icons/es/icons/StopOutlined";

export default class Profil extends React.Component {

    render() {
        return (
            <div>
                <ProfilParam/>
            </div>
        )
    }
}


function ProfilParam() {
    const {loading, error, data} = useQuery(GET_GRAPHQL_INFO);

    if (error) return <Result title={"error"}/>;
    console.log(data);
    return (
        <Card className={"profil-card"}>

            {(!loading && data) ?
                <Descriptions title="Profil">
                    <Descriptions.Item label="Pseudo">{data.pirate.pseudo}</Descriptions.Item>
                <Descriptions.Item label="Crew">{(data.pirate.crew) ? data.pirate.crew.name : <StopOutlined /> }</Descriptions.Item>
                </Descriptions>
            :
                <Skeleton/>
            }

        </Card>
    );
}

const GET_GRAPHQL_INFO = gql`
query{pirate {
    pseudo
    crew{name}
  
}}
`;