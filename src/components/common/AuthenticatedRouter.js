import {Drawer, Layout} from "antd";
import Navbar from "./Navbar";
import Home from "../routes/Home";
import Profil from "../routes/Profil";
import Equipage from "../routes/Equipage";
import Tresor from "../routes/Tresor";
import React, {useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import MenuUnfoldOutlined from "@ant-design/icons/es/icons/MenuUnfoldOutlined";

export default function AuthenticatedRouter() {


    const [visible, setVisible] = useState(false);

    const isTabletOrMobile = useMediaQuery({
        query: '(max-width: 1224px)'
    });

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };


    return (

        <Layout className="height-100">
            {isTabletOrMobile ?

                <>
                    <Layout.Header>
                        <MenuUnfoldOutlined style={{fontSize: "20px", color: "white"}} onClick={showDrawer}/>
                    </Layout.Header>

                    <Drawer
                        bodyStyle={{backgroundColor: "#001529", overflow: "hidden", padding: 0}}
                        placement={"left"}
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                    >
                        <Navbar onClick={onClose}/>
                    </Drawer>
                </>
                :

                <Layout.Sider className="height-100">

                    <Navbar className="height-100"/>
                </Layout.Sider>
            }

            <Layout.Content className="height-100">
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/profil">
                        <Profil/>
                    </Route>
                    <Route exact path="/equipage">
                        <Equipage/>
                    </Route>
                    <Route exact path="/tresor">
                        <Tresor/>
                    </Route>

                    <Redirect to={"/"}/>
                </Switch>
            </Layout.Content>

        </Layout>
    );
}