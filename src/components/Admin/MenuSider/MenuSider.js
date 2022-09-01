import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    MenuOutlined,
    DingtalkOutlined,
    AlertOutlined,
    WarningOutlined 
  } from '@ant-design/icons';

import './MenuSider.scss';

export default function MenuSider (props) {
    const  { menuCollapsed } = props;
    const { Sider } = Layout;

    return (
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme='dark' mode='inline' defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                    <Link to={"/admin"}>
                          <HomeOutlined/>
                          <span className='nav-text'>Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={"/admin/users"}>
                          <UserOutlined />
                          <span className='nav-text'>Usuarios</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to={"/admin/menu"}>
                          <MenuOutlined />
                          <span className='nav-text'>Menu</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to={"/admin/cultivos"}>
                            <DingtalkOutlined />
                          <span className='nav-text'>Cultivos</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to={"/admin/plaguicidas"}>
                            <AlertOutlined />
                          <span className='nav-text'>Plaguicidas</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link to={"/admin/problemas"}>
                          <WarningOutlined />
                          <span className='nav-text'>Problemas</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="7">
                    <Link to={"/admin/ingredientes"}>
                            <AlertOutlined />
                          <span className='nav-text'>Ingredientes activos</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}