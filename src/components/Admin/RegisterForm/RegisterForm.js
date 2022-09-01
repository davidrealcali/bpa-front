import React, { useState } from "react";
import './RegisterForm.scss';
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserAddOutlined, KeyOutlined } from '@ant-design/icons';
import { emailValidation, minLengthValidation } from '../../../utils/formValidation';
import { signUpApi } from '../../../api/user';

export default function RegisterForm () {
    const [inputs, setInputs] = useState({ 
        email: "",
        password: "",
        nombre: "",
        privacyPolicy : false
    });

    const [formValid, setFormValid ] = useState( {
        email: false,
        password: false,
        nombre : true,
        privacyPolicy : false
    });

    const changeForm = e => {
        if( e.target.name === "privacyPolicy") {
            setInputs({
                ...inputs,
                [e.target.name] : e.target.checked
            });
        } else {
            setInputs( {
                ...inputs,
                [e.target.name] : e.target.value
            });
        }
    };

    const inputValidation = e => {
        const { type, name } = e.target;

        if( type === 'email'){
            setFormValid({ ...formValid, [name] : emailValidation(e.target) });
        }

        if( type === "password") {
            setFormValid({ ...formValid, [name] : minLengthValidation( e.target, 6 ) });
        }

        if( type === "checkbox" ){
            setFormValid({ ...formValid, [name] : e.target.checked });
        }

        if( type === "nombre" ){
            setFormValid({ ...formValid, [name] : minLengthValidation( e.target, 3 ) });
        }
    }

    const register =  async e => {
        e.preventDefault();
        const passWordVal = inputs.password;
        
        if( !inputs.email || !inputs.nombre || !passWordVal || !inputs.privacyPolicy ) {
            notification['error']({
                message: "Todos los campos son obligatorios"
            });
        } else {
            //TO DO: CONECTAR CON EL API Y REGISTRAR EL USUARIO
            const data = {
                correo: inputs.email.toLowerCase(),
                nombre: inputs.nombre,
                password: inputs.password,
                rol : 'USER_ROLE'
            }

            const result  = await signUpApi( data );
            
            if( !result.ok ) {
                notification['error']({
                    message: result.message
                });
            } else {
                notification['success']({
                    message: result.message
                });
                resetForm();
            }
        }
    };

    const resetForm = () => {
        const inputs = document.getElementsByTagName('input');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove("sucess");
            inputs[i].classList.remove("error");
        }

        setInputs({
            email: "",
            password: "",
            nombre: "",
            privacyPolicy : false
        });

        setFormValid({
            email: false,
            password: false,
            nombre : true,
            privacyPolicy : false
        });
    }
    
    return (
        <Form className="register-form" onSubmitCapture={ register } onChange={changeForm}>
            <Form.Item>
                <Input
                    prefix={<UserAddOutlined style={{ color: "rgba(0,0,0.25)"}} />}
                    type="email"
                    name="email"
                    placeholder="Correo Electronicos"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.email}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<KeyOutlined style={{ color: "rgba(0,0,0.25)"}} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.password}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<UserAddOutlined style={{ color: "rgba(0,0,0.25)"}} />}
                    type="text"
                    name="nombre"
                    placeholder="Nombre completo"
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.nombre}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox name="privacyPolicy" checked={inputs.privacyPolicy} onChange={inputValidation}>
                    He leido y acepto la politica de privacidad
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-form__button">
                    Crear Usuario
                </Button>
            </Form.Item>
        </Form>
    )
}