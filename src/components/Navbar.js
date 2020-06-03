import * as React from "react";
import {Menu, Layout} from "antd";

import {
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';



export default class Navbar extends React.Component{

    render() {
        return(
            <Layout.Sider>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        Profil
                    </Menu.Item>
                    <Menu.Item key="2" icon={<TeamOutlined />}>
                        Equipage
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
        )
    }
}