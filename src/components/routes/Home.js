import * as React from "react";
import gql from "graphql-tag";

import {Query} from "react-apollo";
import {Card, Result, Spin, Table} from "antd";


export default class Home extends React.Component {


    render() {
        return (
            <div>
                <Card title={"Meilleurs Pirates"}>
                    <Query query={GET_BEST_PIRATES}>
                        {
                            rep => {

                                if (rep.error) {
                                    return <Result title={"error"}/>;
                                }
                                if (rep.loading) {
                                    return <Spin/>
                                }

                                return (
                                    <Table columns={piratesCol} rowKey={"_id"} dataSource={rep.data.pirates}
                                           pagination={false}/>
                                )
                            }
                        }
                    </Query>
                </Card>

                <Card title={"Meilleurs équipages"}>
                    <Query query={GET_BEST_CREWS}>
                        {
                            rep => {

                                if (rep.error) {
                                    return <Result title={"error"}/>;
                                }
                                if (rep.loading) {
                                    return <Spin/>

                                }

                                console.log(rep);

                                return (
                                    <Table columns={crewCol} rowKey={"_id"} dataSource={rep.data.crews}
                                           pagination={false}/>
                                )
                            }
                        }
                    </Query>
                </Card>
            </div>
        )
    }
}

const crewCol = [
    {
        title: "Nom",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Butin",
        dataIndex: "score",
        key: "score",
    }
];

const piratesCol = [
    {
        title: "Nom",
        dataIndex: "pseudo",
        key: "pseudo",
    },
    {
        title: "Butin",
        dataIndex: "score",
        key: "score",
    }
];


const GET_BEST_CREWS = gql`
  query {
  crews {
    _id
    name
  }
}
`;

const GET_BEST_PIRATES = gql`
  query {
  pirates {
    _id
    pseudo
    score
  }
}
`;