import React, {useState} from "react";
import {useMutation} from '@apollo/react-hooks';
import gql from "graphql-tag";
import {Alert, Button, Card, Form, Input} from "antd";
import UserOutlined from "@ant-design/icons/es/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/es/icons/LockOutlined";
import {Link} from "react-router-dom";


function Register() {

    const [register, {loading}] = useMutation(REGISTER);

    const [error, setError] = useState(null);

    const onFinish = values => {
        register({variables: values}).then(res => {
            localStorage.setItem("authToken", res.data.createPirateWithInput);
            window.location.href = "/";
        }).catch(() => {
            setError(<Alert type={"error"} message={"Pseudo déjà utilisé"}/>);
        });
    };

    return (

        <div className="login-container">
            <Card className="login-card">
                <h1>Devenez pirate</h1>
                <Form
                    name="basic"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="pseudo"
                        rules={[{required: true, message: 'Veuillez rentrer un pseudo'}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Veuillez rentrer un mot de passe'}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item style={{marginBottom: 10}}>
                        <Button loading={loading} className="login-form-button" type="primary" htmlType="submit">
                            S'inscrire
                        </Button>
                    </Form.Item>
                    <Link  to={'/login'}>Déjà pirate? Connectez-vous!</Link>

                </Form>
                {error}
            </Card>
        </div>
    );
}

const REGISTER = gql`
  mutation register($pseudo: String!, $password: String!) {
  createPirateWithInput(
    input: { pseudo: $pseudo, password: $password }
  )
}
`;

export default Register