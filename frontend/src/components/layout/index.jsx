// react related
import React from "react";

// third party imports
import { Layout, Menu } from "antd";
import { useLocation, NavLink } from "react-router-dom";
import { FileOutlined, FileAddOutlined } from "@ant-design/icons";

// project imports
import RenderRoutes from "../../routes/Routes";
import smarcow from "../../smarcow.svg";
const { Header, Content, Footer } = Layout;

export default function LayoutComponent() {
  const location = useLocation();
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header>
        <div className="logo">
          <img src={smarcow} alt="" className="logo__img" />
        </div>

        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <NavLink to="/" exact>
              <FileOutlined style={{ marginRight: 10 }} />
              Projects
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/project/create">
            <NavLink to="/project/create" exact>
              <FileAddOutlined style={{ marginRight: 10 }} />
              Create Project
            </NavLink>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{
          margin: "24px 16px 0",
          overflow: "initial",
        }}
      >
        <div className="site-layout-content">
          <RenderRoutes />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>SmartCow ©2021</Footer>
    </Layout>
  );
}
