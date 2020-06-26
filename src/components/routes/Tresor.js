import React, {useState} from "react";
import {Button, Card, Descriptions, Form, InputNumber, Result, Spin} from "antd";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import StopOutlined from "@ant-design/icons/es/icons/StopOutlined";
import {Mutation} from "react-apollo";


const availableOp = [
    {signe: "x", resolver: (a, b) => a * b},
    {signe: "+", resolver: (a, b) => a + b},
    {signe: "-", resolver: (a, b) => a - b},
];

export default function Tresor() {


    const [a, setA] = useState(Math.floor(Math.random() * 100));
    const [b, setB] = useState(Math.floor(Math.random() * 100));
    const [op, setOP] = useState(Math.floor(Math.random() * 3));
    const {qloading, error, data} = useQuery(GET_PIRATE);

    if (error){
        console.error(error);
        return <Result title={"error"}/>;
    }

    const [form] = Form.useForm();


    let operation = a + " " + availableOp[op].signe + " " + b;

    const t = (!data) ? null : (
        <Descriptions title="Profil">
            <Descriptions.Item label="Pseudo">{data.pirate.pseudo}</Descriptions.Item>
            <Descriptions.Item label="Crew">
                {(data.pirate.crew) ? data.pirate.crew.name : <StopOutlined/>}
            </Descriptions.Item>
            <Descriptions.Item label="Argent">{data.pirate.score} €</Descriptions.Item>
        </Descriptions>
    );

    return (
        <Card>
            {(qloading) ? <Spin/> : t}
            <h1>{operation}</h1>
            <Mutation
                mutation={INC_SCORE}
                update={(cache, {data: {increaseScore}}) => {
                    cache.writeQuery({
                        query: GET_PIRATE,
                        data: {pirate: increaseScore},
                    });
                }}
            >

                {(incrementScore, {loading}) => (
                    <Form
                        form={form}
                        onFinish={() => {
                            incrementScore().then(() => {
                                setA(Math.floor(Math.random() * 100));
                                setB(Math.floor(Math.random() * 100));
                                setOP(Math.floor(Math.random() * 3));

                                form.resetFields();
                            }).catch(err => {
                                console.error(err)
                            });
                        }}
                    >

                        <Form.Item
                            name={"answer"}
                            validateTrigger={"onSubmit"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez entrer une réponse',
                                },
                                () => ({
                                    validator(rule, value) {
                                        if (availableOp[op].resolver(a, b) === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("Mauvaise réponse");
                                    },
                                }),
                            ]}
                        >
                            <InputNumber style={{width: "100%"}} placeholder={"Reponse"}/>
                        </Form.Item>
                        <Form.Item>
                            <Button loading={loading} type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                )}
            </Mutation>
        </Card>
    )
}

const INC_SCORE = gql`
mutation incrementScore {
    increaseScore {
        _id
        score
        crew{name}
        pseudo
    }
  }
`;


const GET_PIRATE = gql`
query{pirate {
    pseudo
    score
    crew{name}
  
}}
`;