import {Form, Input, Modal} from "antd";
import React, {useState} from "react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";

export default function CreateForm(props) {

    const [form] = Form.useForm();
    const [createCrew, {loading}] = useMutation(CREATE_CREW);
    const [error, setError] = useState(null);

    return (

        <Modal visible={true}
               onCancel={props.onCancel}
               closable={false}
               onOk={() => {
                   const values = form.getFieldsValue();
                   createCrew({variables: values}).then(() => {
                       props.onOk();
                   }).catch( err => {
                       setError(err.message);
                   })

               }}
               confirmLoading={loading}
        >
            <Form form={form}>
                <Form.Item
                    label={"Nom de l'équipage"}
                    name={"name"}
                >
                    <Input/>
                </Form.Item>
            </Form>
            {error}
        </Modal>
    );
}


const CREATE_CREW = gql`
  mutation createCrew($name: String!) {
    createCrew(name: $name)
  }
`;