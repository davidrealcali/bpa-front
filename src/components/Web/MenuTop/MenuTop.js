import React, { useState, useEffect } from "react";
import "./MenuTop.scss";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { getMenuApi } from "../../../api/menu";

import DavidLogo  from '../../../assets/img/png/datagro_logo.png';
import SocialLinks from "../SocialLinks/SocialLinks";

export default function MenuTop() {
    const [ menuData, setMenuData ] = useState([]);

    useEffect(() => {
        getMenuApi().then( response => {
            const arrayMenu = [];
            response.menu.forEach(element => {
                if( element.active ) {
                    arrayMenu.push(element);
                }
            });
            setMenuData(arrayMenu);
        });
    }, [])
    
    return (
        <Menu className="menu-top-web" mode="horizontal">
            
            <Menu.Item className="menu-top-web__logo">
                 <Link to={"/"}>
                     <img  src={DavidLogo} alt="David" />
                 </Link>
            </Menu.Item>

            { menuData.map( item => {
                const external = item.url.indexOf("http") > - 1 ? true  : false;

                if ( external ) {
                    return (
                        <Menu.Item key={item.uid} className="menu-top-web__item" >
                            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                        </Menu.Item>
                    );
                }

                return (
                    <Menu.Item  key={item.uid } className="menu-top-web__item">
                        <Link to={item.url}> {item.title} </Link>
                    </Menu.Item>
                )      
            })}

            { /*<Menu.Item>
                <SocialLinks/>
              </Menu.Item> 
              */ 
            }     
        </Menu>
    )
}