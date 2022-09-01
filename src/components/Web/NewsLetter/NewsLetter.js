import React, { useState } from 'react';
import "./NewsLetter.scss";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { suscribeNewsLetterApi } from '../../../api/newsletter';

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const resultValidation = emailValid.test(email);

    if(!resultValidation) {
        notification["error"]({
            message: "El correo electronico no es valido"
        });
    } else {
        suscribeNewsLetterApi(email).then( response => {
            if(response.code !== 200) {
                notification["warning"]({
                    message: response.message
                });
            } else {
                notification["success"]({
                    message: response.message
                });
                setEmail("");
            }
        });
    }
  }

  return (
    <div className='newsletter'>
        <h3>NewsLetter</h3>
        <Form onSubmitCapture={onSubmit}>
            <Form.Item>
                <Input
                    prefix={<UserOutlined />}
                    placeholder="Correo electronico"
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='login-form-button' >
                    ¡Me suscribo!
                </Button>
            </Form.Item>
        </Form>
    </div>
  )
}
