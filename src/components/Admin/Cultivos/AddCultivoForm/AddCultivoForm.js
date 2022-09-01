import React, { useState } from 'react'
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { UserAddOutlined, MailOutlined, LinkOutlined} from '@ant-design/icons';
import { getAccessTokenApi } from '../../../../api/auth';
import { postCultiveApi } from '../../../../api/cultivo';

import "./AddCultivoForm.scss";


export default function AddCultivoForm( props ) {
  const { setIsVisibleModal, setReloadCultivos } = props;
  const [ cultivoData, setCultivoData ] = useState({});

  const addCultivo  = event => {
      event.preventDefault();
      console.log("Creando cultivos");

      if( !cultivoData.nombreCientifico || !cultivoData.nombreComun  ) {
         notification["error"]({
            message: "Los cambios nombre cientifico y/o nombre comun son obligatorios"
        });
      } else {
        const token = getAccessTokenApi();
        postCultiveApi(token, cultivoData ).then( response => {
            notification["success"]({
                message: response
            });
            setIsVisibleModal(false);
            setReloadCultivos(true);
            setCultivoData({});
        }).catch( err => {
            notification["error"]({
                message: err
            });
        });
      }
  }

  return (
    <div className="add-cultivo-form">
            <AddForm 
                cultivoData ={cultivoData}
                setCultivoData={setCultivoData}
                addCultivo={addCultivo}
            />
     </div>
  )
}

function AddForm( props ) {
    const { cultivoData, setCultivoData, addCultivo } = props;
    const { Option } = Select;

    return (
        <Form className="form-add" onSubmitCapture={addCultivo} >
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserAddOutlined />}
                            placeholder="Nombre Comun"
                            value={cultivoData.nombreComun}
                            onChange ={ e => setCultivoData({...cultivoData , nombreComun: e.target.value })}
                         />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserAddOutlined />}
                            placeholder="Nombre Cientifico"
                            value={cultivoData.nombreCientifico}
                            onChange ={ e => setCultivoData({...cultivoData , nombreCientifico: e.target.value })}
                         />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LinkOutlined />}
                            placeholder="Img Cultivo"
                            value={cultivoData.imgCultivo}
                            onChange ={ e => setCultivoData({...cultivoData , imgCultivo: e.target.value })}
                         />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LinkOutlined />}
                            placeholder="Img Ciclo"
                            value={cultivoData.imgCiclo}
                            onChange ={ e => setCultivoData({...cultivoData , imgCiclo: e.target.value })}
                         />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit"> Crear Cultivo </Button>
            </Form.Item>
        </Form>
    )
}


