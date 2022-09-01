import React, { useState } from 'react';
import { Form, Input, Button, notification } from "antd";
import { UserAddOutlined, KeyOutlined } from '@ant-design/icons';
import "./LoginForm.scss";
import { signInApi } from '../../../api/user';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';

export default function LoginForm() {
    const [inputs, setInputs ] = useState({
        correo: "",
        password : ""
    });

    const changeForm = ( e ) => {
        setInputs({
            ...inputs,
            [ e.target.name ] : e.target.value
        });
    };

    const login = async  ( e ) => {
        e.preventDefault();
        const result = await signInApi( inputs );

        if ( result.msg ) {
            notification["error"]({
                message: result.msg
            });
        } else {
            const { accessToken, refreshToken } = result;
            localStorage.setItem( ACCESS_TOKEN, accessToken );
            localStorage.setItem( REFRESH_TOKEN, refreshToken );

            notification["success"]({
                message: "Login Success."
            });

            window.location.href = "/admin";
        }
    }

    return (
        <Form className='login-form' onChange={changeForm} onSubmitCapture={login}>
            <Form.Item>
                <Input
                    prefix={<UserAddOutlined style={{ color: "rgba(0,0,0,.25)"}} />}
                    type="correo"
                    name='correo'
                    placeholder='Correo electronico'
                    className='login-form__input'
                />
            </Form.Item>  
            <Form.Item>
                <Input
                    prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)"}} />}
                    type="password"
                    name='password'
                    placeholder='Contraseña'
                    className='login-form__input'
                />
            </Form.Item>     
            <Form.Item>
                <Button htmlType='submit' className='login-form__button'>Entrar</Button>
            </Form.Item> 
        </Form>
    )
}