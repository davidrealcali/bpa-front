import React, { useState } from "react";
import {Form, Input, Button, Select, notification } from "antd";
import { FileAddOutlined } from '@ant-design/icons';
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddMenuWebForm.scss";
import { addMenuApi } from "../../../../api/menu";

export default function AddMenuWebForm( props ) {
    const { setIsVisibleModal, setReloadMenuWeb } = props;
    const [ menuWebData, setMenuWebData ] = useState({});

    const addMenu = event => {
        event.preventDefault();
        
        let finalData = {
            title: menuWebData.title,
            url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url
        };

        if( !finalData.title || !finalData.url || !menuWebData.url  ) {
                notification["error"]({
                    message: "Todos los campos son obligatorios"
                });
        } else {

            const accessToken = getAccessTokenApi();
            finalData.active = false;
            finalData.order  = 1000;

            addMenuApi( accessToken, finalData ).then( response => {
                notification["success"]({
                    message: response.message
                });
                setIsVisibleModal(false);
                setReloadMenuWeb(true);
                setMenuWebData({});
                finalData = {}

            }).catch( () => {
                notification["error"]({
                    message: "Error en el servidor"
                });
            });
        }
    }

    return (
        <div className="add-menu-web-form">
            <AddForm 
                menuWebData={menuWebData}
                setMenuWebData={setMenuWebData}
                addMenu={addMenu}
            />
        </div>
    )
}

function AddForm(props) {
    const { menuWebData, setMenuWebData, addMenu } = props;
    const { Option } = Select;

    const selectBefore = (
        <Select
            defaultValue="http://"
            style={{ width: 90}}
            onChange={ e=> setMenuWebData({ ...menuWebData, http: e })}
        >
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    )
    
    return (
        <Form className="form-add" onSubmitCapture={addMenu}>
            <Form.Item>
                <Input 
                    prefix={<FileAddOutlined />}
                    placeholder="Titulo"
                    value={menuWebData.title}
                    onChangeCapture={ e => setMenuWebData({ ...menuWebData, title: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    addonBefore={selectBefore}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChangeCapture={ e => setMenuWebData({ ...menuWebData, url: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Crear men??
                </Button>
            </Form.Item>
        </Form>
    )
}