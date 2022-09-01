import {  Button } from "antd";
import { PoweroffOutlined,MenuFoldOutlined } from '@ant-design/icons';
import React from "react";
import DavidLogo  from '../../../assets/img/png/datagro_logo.png';
import { logout } from '../../../api/auth';

import './MenuTop.scss';

export default function MenuTop( props ) {
    const { menuCollapsed, setMenuCollapsed } = props;

    const logoutUser = () => {
        logout();
        window.location.reload();
    }

    return (
        <div className="menu-top">
            <div className="menu_top__left">
                <img className="menu-top__left-logo" 
                src={DavidLogo}
                alt="Cristian David Otalvaro"
                />
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed) }>
                     <MenuFoldOutlined />
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={() => logoutUser()}>
                     <PoweroffOutlined />
                </Button>
            </div>
        </div>
    )
}