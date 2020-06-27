import React, {useState} from "react";
import {Button, Card, Form, InputNumber, message, Popover, Result, Spin} from "antd";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {Mutation} from "react-apollo";
import Coffre from "../tresor/Coffre";
import QuestionCircleOutlined from "@ant-design/icons/es/icons/QuestionCircleOutlined";


const info = () => {
    message.info('10 pieces gagnées');
};

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

    if (error) {
        console.error(error);
        return <Result title={"error"}/>;
    }

    const [form] = Form.useForm();


    let operation = a + " " + availableOp[op].signe + " " + b;

    const t = (!data) ? null : (

        <h1> Butin: {data.pirate.score} €</h1>
    );

    return (
        <Card className="spaced-card flex-vertical flex-center">
            {(qloading) ? <Spin/> : t}
            <div>
                <Coffre text={operation}/>
            </div>


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
                                info();
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
                                        console.log(value);
                                        if (!value || value === "") {
                                            return Promise.reject();
                                        }
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
                            <Button loading={loading} type="primary" htmlType="submit">Ouvrir le coffre</Button>
                            <Popover content={"Répondre à l'énigme se trouvant sur le cadenas du coffre permet de gagner du butin."}>
                                <QuestionCircleOutlined style={{marginLeft: "1rem"}}/>
                            </Popover>
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