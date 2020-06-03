import * as React from "react";
import {Menu, Layout} from "antd";

import {
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Link} from "react-router-dom";



export default class Navbar extends React.Component{

    render() {
        return(
            <Layout.Sider>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="0" icon={<UserOutlined />}>
                        <Link to={"/"}>Accueil</Link>
                    </Menu.Item>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to={"/profil"}>Profil</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<TeamOutlined />}>
                        <Link to={"/equipage"}>Equipage</Link>
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
        )
    }
}