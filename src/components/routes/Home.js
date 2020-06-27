import * as React from "react";
import gql from "graphql-tag";

import {Query} from "react-apollo";
import {Card, Result, Spin, Table} from "antd";
import {useMediaQuery} from "react-responsive";


export default function Home() {


    const isTabletOrMobile = useMediaQuery({
        query: '(max-width: 1224px)'
    });

    return (
        <div className={(isTabletOrMobile) ? "" : "flex-horizontal"}>
            <Card title={"Meilleurs Pirates"} className={(isTabletOrMobile) ? "spaced-card" : "spaced-card w-40"}>
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
                                <Table columns={piratesCol} rowKey={"_id"} dataSource={rep.data.bestPirates}
                                       pagination={false}/>
                            )
                        }
                    }
                </Query>
            </Card>

            <Card title={"Meilleurs équipages"} className={(isTabletOrMobile) ? "spaced-card" : "spaced-card w-40"}>
                <Query query={GET_BEST_CREWS}>
                    {
                        rep => {

                            if (rep.error) {
                                return <Result title={"error"}/>;
                            }
                            if (rep.loading) {
                                return <Spin/>

                            }

                            return (
                                <Table columns={crewCol} rowKey={"_id"} dataSource={rep.data.bestCrews}
                                       pagination={false}/>
                            )
                        }
                    }
                </Query>
            </Card>
        </div>
    )
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
  bestCrews {
    _id
    name
    score
  }
}
`;

const GET_BEST_PIRATES = gql`
  query {
  bestPirates {
    _id
    pseudo
    score
  }
}
`;