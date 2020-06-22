import React, {useState} from "react";
import {useMutation} from '@apollo/react-hooks';
import gql from "graphql-tag";
import {Alert, Button, Card, Form, Input} from "antd";
import UserOutlined from "@ant-design/icons/es/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/es/icons/LockOutlined";
import {Link} from "react-router-dom";


function Login() {

    const [login, {loading}] = useMutation(LOGIN);

    const [error, setError] = useState(null);

    const onFinish = values => {
        login({variables: values}).then(res => {
            localStorage.setItem("authToken", res.data.login);
            window.location.href = "/";
        }).catch(e => {
            setError(<Alert type={"error"} message={"Identifiants invalides"}/>);
        });
    };

    return (

        <div className="login-container">
            <Card className="login-card">
                <h1>La piraterie</h1>
                <Form
                    name="basic"
                    className="login-form"
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
                            A l'abordage !
                        </Button>
                    </Form.Item>
                    <Link  to={'/register'}>create account</Link>
                </Form>
                {error}
            </Card>
        </div>
    );
}

const LOGIN = gql`
  mutation login($pseudo: String!, $password: String!) {
    login(input: { pseudo: $pseudo, password: $password })
  }
`;

export default Login