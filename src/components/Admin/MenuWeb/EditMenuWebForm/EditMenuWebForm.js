import React, { useState, useEffect } from "react";
import { updateMenuApi } from "../../../../api/menu";
import { Form, Input, Button, notification } from "antd";
import { getAccessTokenApi } from "../../../../api/auth";
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';

import "./EditMenuWebForm.scss";

export default function EditMenuWebForm( props ) {
     const { setIsVisibleModal, setReloadMenuWeb, menu } = props;
     const [ menuWebData, setMenuWebData ] = useState({});

     useEffect(() => {
       setMenuWebData(menu);
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [menu] )
     
     const editMenu = event => {
        event.preventDefault();
        
        if ( !menuWebData.title || !menuWebData.url  ) {
            notification["error"]({
                message : "Todos los campos son obligatorios"
            });
        } else {
            const accessToken = getAccessTokenApi();
            updateMenuApi( accessToken, menuWebData.uid, menuWebData ).then( response => {
                notification["success"]({
                    message : response
                });
                setIsVisibleModal(false);
                setReloadMenuWeb(true);

            }).catch( err => {
                notification["error"]({
                    message : "Error en el servidor"
                });
            })
        }
     }

     return (
        <div className="edit-menu-web-form">
            <EditForm 
                menuWebData={menuWebData}
                setMenuWebData={setMenuWebData}
                editMenu={editMenu}
            />
        </div>
     )
}

function EditForm( props ) {
    const { menuWebData, setMenuWebData, editMenu } = props;
    return (
        <Form className="form-edit" onSubmitCapture={editMenu}>
            <Form.Item>
                <Input 
                    prefix={<FontSizeOutlined />}
                    placeholder="Titulo"
                    value={ menuWebData.title }
                    onChange={ e => setMenuWebData({ ...menuWebData, title: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LinkOutlined />}
                    placeholder="Url"
                    value={ menuWebData.url }
                    onChange={ e => setMenuWebData({ ...menuWebData, url: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar menu
                </Button>
            </Form.Item>
        </Form>
    )
}