import {Input, Modal, Table} from "antd";
import React, {useState} from "react";
import gql from "graphql-tag";
import {useMutation, useQuery} from "@apollo/react-hooks";


const columns = [
    {
        title: "Nom",
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: "Capitaine",
        dataIndex: 'creator',
        key: 'creator',
        render: (creator) => {
            return creator.pseudo;
        }
    }
];




export default function JoinCrew(props) {


    const {error, loading, data} = useQuery(GET_CREWS);
    const [filter, setFilter] = useState('');
    const [selected, setSelected] = useState(null);
    const [joinCrew, {loadingjoin}] = useMutation(JOIN_CREW);
    const [errorMsg, setErrorMsg] = useState(null);



    return (

        <Modal visible={true}
               onCancel={props.onCancel}
               closable={false}
               onOk={() => {
                   joinCrew({variables: {_id: selected}}).then(() => {
                       props.onOk();
                   }).catch( err => {
                       setErrorMsg(err.message);
                   })

               }}
               okButtonProps={{disabled: selected === null}}
               confirmLoading={loadingjoin}

        >
            <h1>Equipages</h1>
            <Input
                placeholder={"Rechercher..."}
                value={filter}
                   onChange={e => {
                       setFilter(e.target.value)
                   }}
                   style={{marginBottom: 5}}
            />
            <Table
                loading={loading}
                columns={columns}
                rowKey={"_id"}
                dataSource={(data) ?
                    data.crews.filter(it => it.name.toLowerCase().includes(filter.toLowerCase()) || it.creator.pseudo.toLowerCase().includes(filter.toLowerCase()))
                    : []
                }
                rowClassName={(record, rowIndex) => {
                    if (selected === null || record._id !== selected) {
                        return "equipages-row";
                    } else {
                        return "equipages-row equipages-row-selected";
                    }
                }}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setSelected(record._id)
                        },
                    };
                }}

            />

            {error}
            {errorMsg}
        </Modal>
    );
}


const GET_CREWS = gql`
query{crews{_id,name creator{_id, pseudo}}}
`;

const JOIN_CREW = gql`
mutation joinCrew($_id: ID!) {
    joinCrew(_id: $_id)
  }
`;