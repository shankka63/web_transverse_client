import * as React from "react";
import {Menu, Layout} from "antd";

import {
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import LogoutOutlined from "@ant-design/icons/es/icons/LogoutOutlined";



export default class Navbar extends React.Component{

    render() {
        return(
            <Layout.Sider className="height-100">
                <div className="logo" />
                <Menu style={{height:"100%"}} theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="0" icon={<UserOutlined />}>
                        <Link to={"/"}>Accueil</Link>
                    </Menu.Item>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to={"/profil"}>Profil</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<TeamOutlined />}>
                        <Link to={"/equipage"}>Equipage</Link>
                    </Menu.Item>

                    <Menu.Item style={{position: "absolute", bottom: 0}} icon={<LogoutOutlined style={{color: "#970000"}}/>}>
                        <a style={{color: "#970000"}} onClick={()=> {localStorage.clear()}} href={"/login"}>Déconnexion</a>
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
        )
    }
}