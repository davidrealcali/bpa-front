import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Form, notification, Input, Select, Button, Row, Col, message} from "antd";
import { useDropzone} from "react-dropzone";
import Noavatar from "../../../../assets/img/png/no-avatar.png";
import { UserOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { getAvatarApi, updateUserApi, uploadAvatarApi }  from '../../../../api/user';
import { getAccessTokenApi, getRefreshTokenApi, refreshAccessTokenApi } from '../../../../api/auth';

import "./EditUserForm.scss";

export default function EditUserForm ( props ) {
    const  { user, setIsVisibleModal, setReloadUsers } = props;
    const [ avatar, setAvatar ] = useState(null);
    const [ userData, setUserData] = useState( {
        nombre: user.nombre,
        correo: user.correo,
        rol:  user.rol,
        avatar : user.avatar
    } );

    useEffect(() => {
        setUserData({
            nombre: user.nombre,
            correo: user.correo,
            rol:  user.rol,
            avatar : user.avatar
        });
    }, [user]);

    useEffect(() => {
      if ( user.avatar ) {
        getAvatarApi(user.avatar).then ( response => {
            setAvatar(response);
        })
      } else {
        setAvatar(null);
      }
    }, [user]);
    

    useEffect( () => {
        if ( avatar ) {
            setUserData({ ...userData, avatar: avatar.file })
        }
    }, [avatar]);

    const updateUser = e => {
        e.preventDefault();
        const token = getAccessTokenApi();
        let userUpdate = userData;

        if ( userUpdate.password || userUpdate.repeatPassword ) {
             if ( userUpdate.password !== userUpdate.repeatPassword ){
                notification["error"]({
                    message: "Las contraseñas tienen que estar iguales"
                });
                return;
             } else {
                delete userUpdate.repeatPassword;
             }   
        }

        if( !userUpdate.nombre || !userUpdate.correo ) {
            notification["error"]({
                message: "El nombre y email son obligatorios"
            });
            return;
        }
        //console.log( typeof userUpdate.avatar);
        if( typeof userUpdate.avatar === "object"  && userUpdate.avatar !== null ) {         
            uploadAvatarApi( token, userUpdate.avatar, user.uid ).then ( response => {
                userUpdate.avatar = response.avatarName;
                updateUserApi( token, userUpdate, user.uid).then( result => {
                    notification["success"]({
                        message: 'Se modificaron los datos con exito'
                    });
                    refreshAccessTokenApi(getRefreshTokenApi());
                    setIsVisibleModal(false);
                    setReloadUsers(true);
                    
                });
            });
        } else {
            updateUserApi( token, userUpdate, user.uid).then( result => {
                notification["success"]({
                    message: 'Se modificaron los datos con exito'
                });
                refreshAccessTokenApi(getRefreshTokenApi());
                setIsVisibleModal(false);
                setReloadUsers(true);
            });
        }
    }

    return (
        <div className="edit-user-form">
            <UploadAvatar avatar={ avatar} setAvatar={ setAvatar } />
            <EditForm  userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </div>
    );
}

function UploadAvatar ( props ) {
     const { avatar, setAvatar } = props;
     const [ avatarUrl, setAvatarUrl ] = useState(null);

     useEffect(() => {
       if( avatar ){
         if ( avatar.preview ) {
            setAvatarUrl( avatar.preview );
         } else {
            setAvatarUrl( avatar );
         }
       } else {
            setAvatarUrl( null );
       }
     }, [avatar]);
     
     const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) })
        }, [ setAvatar ]
     );

     const { getRootProps, getInputProps, isDragActive } = useDropzone ( {
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
     });

     return (
        <div className="upload-avatar" {...getRootProps() }>
            <input { ...getInputProps()}/>
            { isDragActive ? (
                <Avatar size={150} src={Noavatar} />
            ) : (
                <Avatar size={150} src={avatarUrl ? avatarUrl: Noavatar } />
            )}
        </div>
     )
}

function EditForm( props ) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;

    return (
        <Form  className="form-edit" onSubmitCapture={ updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<UserOutlined/>}
                            placeholder="Nombre"
                            value={userData.nombre}
                            onChange= { e => setUserData ({ ...userData, nombre: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<UserOutlined/>}
                            placeholder="Correo Electronico"
                            value={userData.correo}
                            onChange= { e => setUserData ({ ...userData, correo: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<EyeInvisibleOutlined />}
                            type="password"
                            placeholder="Contraseña"
                            onChange={ e => setUserData({ ...userData, password: e.target.value}) }
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<EyeInvisibleOutlined />}
                            type="password"
                            placeholder="Repetir contraseña"
                            onChange={ e => setUserData({ ...userData, repeatPassword: e.target.value}) }
                        />
                    </Form.Item>
                </Col>     
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                  <Form.Item>
                    <Select 
                            placeholder="Selecciona un rol de usuario"
                            onChange={e => setUserData({ ...userData, rol: e})}
                            value={userData.rol}
                            >
                            <Option value="ADMIN_ROLE">Administrador</Option>
                            <Option value="USER_ROLE">Usuario</Option>
                        </Select>
                 </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Usuario
                </Button>
            </Form.Item>
        </Form>
    )
}