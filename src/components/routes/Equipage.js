import * as React from "react";
import {useState} from "react";

import {useMutation, useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {Button, Card, Empty, Result, Spin, Table} from "antd";
import CreateForm from "../equipage/CreateForm";
import JoinCrew from "../equipage/JoinCrew";


const tableColumns = [
    {
        title: "Pirate",
        dataIndex: 'worker',
        key: 'worker',
        render: (worker) => {
            return <h4>{worker.pseudo}</h4>;
        }
    },
    {
        title: "Role",
        dataIndex: 'role',
        key: 'role',
        render: (role) => {
            return role.name;
        }
    }
];


export default function Equipage() {
    const {loading, error, data, refetch} = useQuery(GET_GRAPHQL_INFO);

    const [leaveCrew] = useMutation(LEAVE_CREW);

    const [modal, setModal] = useState(null);
    if (loading) return <Spin/>;
    if (error) return <Result title={error}/>;


    console.log(data);
    if (data.pirateCrew === null) {
        return (
            <Empty image={<img alt={"bateau cassé"} src={"bateau.png"}/>}
                   description={"Vous n'avez pas d'équipage pour le moment"} className="profil-card">
                <div style={{display: "inline"}}>
                    <Button style={{marginRight: 10}} type={"primary"} onClick={() => {
                        setModal(
                            <CreateForm
                                onOk={() => {
                                    setModal(null);
                                    refetch();
                                }}
                                onCancel={() => {
                                    setModal(null)
                                }}
                            />
                        );
                    }}>
                        Créer un équipage
                    </Button>

                    <Button onClick={() => {
                        setModal(
                            <JoinCrew
                                onOk={() => {
                                    setModal(null);
                                    refetch();
                                }}
                                onCancel={() => {
                                    setModal(null)
                                }}
                            />
                        );
                    }}>
                        Rejoindre un équipage
                    </Button>
                </div>
                {modal}
            </Empty>
        )
    }

    const formatedData = [];

    data.pirateCrew.roles.forEach(role => {
       role.workers.forEach(worker => {
           formatedData.push({worker, role})
       });
    });

    return (
        <Card className="profil-card" title={data.pirateCrew.name} extra={<Button type="danger" onClick={() => {
            leaveCrew().then(() => {
                refetch();
            }).catch((err) => {
                console.error(err);
            })
        }}>Quittez l'équipage</Button>}>
            <span>Createur: {data.pirateCrew.creator.pseudo}</span>
            <Table columns={tableColumns} dataSource={formatedData} rowKey={'_id'}/>
        </Card>

    );
}



const LEAVE_CREW = gql`
mutation leaveCrew{
  leaveCrew  
}
`;

const GET_GRAPHQL_INFO = gql`
query {
  pirateCrew {
    name
    creator {
      pseudo
    }
    roles {
      _id
      name
      workers {
        pseudo
      }
    }
  }
}

`;