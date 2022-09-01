import React, { useState } from "react";
import { Form, Icon, Input, Select, Button, Row, Col, notification } from "antd";
import { signUpAdminApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import "./AddUserForm.scss";
import { UserAddOutlined, MailOutlined, KeyOutlined} from '@ant-design/icons';

export default function EditUserForm ( props ) {
    console.log('si llega xdd');
    const { setIsVisibleModal, setReloadUsers } = props;
    const [ userData, setUserData ] = useState({});
    const addUser = event => {
        event.preventDefault();
        console.log('Creando usuaros');

        if( !userData.nombre || !userData.rol || !userData.password || !userData.repeatPassword 
            || !userData.correo ) {
                notification["error"]({
                    message: "Todos los campos son obligatorios"
                });
            } else if ( userData.password !== userData.repeatPassword ){
                notification["error"]({
                    message: "Las contraseñas tienen que ser iguales"
                });  
            } else {
                const accessToken = getAccessTokenApi();

                signUpAdminApi( accessToken, userData ).then( response => {
                    console.log(response);
                    notification["success"]({
                        message: response
                    });
                    setIsVisibleModal(false);
                    setReloadUsers(true);
                    setUserData({});

                }).catch( error => {
                    notification["error"]({
                        message: error 
                    }); 
                });
            }
        }

    return (
        <div className="add-user-form">
            <AddForm  
                userData={userData}
                setUserData={setUserData}
                addUser={addUser}
            />
        </div>
    )
}

function AddForm( props ) {
    const { userData, setUserData, addUser } = props;
    const { Option } = Select;

    return (
        <Form className="form-add" onSubmitCapture={addUser} >
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserAddOutlined />}
                            placeholder="Nombre completo"
                            value={userData.nombre}
                            onChange ={ e => setUserData({...userData , nombre: e.target.value })}
                         />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Correo electronico"
                            value={userData.correo}
                            onChange ={ e => setUserData({...userData , correo: e.target.value })}
                         />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<KeyOutlined />}
                            type="password"
                            placeholder="Contraseña"
                            value={userData.password}
                            onChange ={ e => setUserData({...userData , password: e.target.value })}
                         />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<KeyOutlined />}
                            placeholder="Repetir contraseña"
                            type="password"
                            value={userData.repeatPassword}
                            onChange ={ e => setUserData({...userData , repeatPassword: e.target.value })}
                         />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Selecciona un rol"
                            onChange={ e => setUserData({ ...userData, rol: e })}
                            value={userData.rol}
                        >
                            <Option value="ADMIN_ROLE">Administrador</Option>
                            <Option value="USER_ROLE"> Usuario</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit"> Crear usuario </Button>
            </Form.Item>
        </Form>
    )
}