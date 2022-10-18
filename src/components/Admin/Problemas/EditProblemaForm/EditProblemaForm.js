import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { getAccessTokenApi } from '../../../../api/auth';
import { updateProblemas } from '../../../../api/problema';

const { TextArea } = Input;

export default function EditProblemaForm( props ) {
  const { setIsVisibleModal, setReloadProblemas, problema } = props;
  const [ problemaData, setProblemaData ] = useState({});
  
  useEffect(() => {
    setProblemaData(problema);
  }, [problema]);

  const editProblema = event => {
      if( !problemaData.nombreComun || !problemaData.nombreCientifico || !problemaData.comentarios
        || !problemaData.categoriaProblema || !problemaData.sintomas || !problemaData.cicloVida ) {
            notification["error"]({
                message: "Los campos son obligatorios"
            });
      } else {
            const token = getAccessTokenApi();
            updateProblemas( token, problemaData.uid, problemaData ).then ( response => {
                notification["success"]({
                    message : response
                });
                setIsVisibleModal(false);
                setReloadProblemas(true);
            }).catch( err => {
                notification["error"]({
                    message : err
                });
            });
      }
  }
  
  return (
    <div className='edit-menu-web-form'>
        <EditarProblemaForm
            problemaData={problemaData}
            setProblemaData={setProblemaData}
            editProblema={editProblema}
        />
    </div>
  )
}

function EditarProblemaForm (props) {
    const { problemaData, setProblemaData, editProblema } = props;
    const { Option } = Select;

    return (
        <Form className='form-edit' onSubmitCapture={editProblema}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                        // prefix={<FontSizeOutlined />}
                            placeholder="Nombre comun"
                            value={ problemaData.nombreComun }
                            onChange={ e => setProblemaData({ ...problemaData, nombreComun: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                         <Input 
                        // prefix={<FontSizeOutlined />}
                            placeholder="Nombre cientifico"
                            value={ problemaData.nombreCientifico }
                            onChange={ e => setProblemaData({ ...problemaData, nombreCientifico: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <TextArea
                        // prefix={<FontSizeOutlined />}
                            rows={4}
                            placeholder="Comentarios"
                            value={ problemaData.comentarios }
                            onChange={ e => setProblemaData({ ...problemaData, comentarios: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                         <Select 
                        // prefix={<FontSizeOutlined />}
                            placeholder="Categoria problema"
                            value={ problemaData.categoriaProblema }
                            onChange={ e => setProblemaData({ ...problemaData, categoriaProblema: e })}>
                            <Option value="Enfermedades">Enfermedades</Option>
                            <Option value="¨Plaga">Plaga</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                        // prefix={<FontSizeOutlined />}
                            //rows={4}
                            placeholder="Sintomas"
                            value={ problemaData.sintomas }
                            onChange={ e => setProblemaData({ ...problemaData, sintomas: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                         <Input
                        // prefix={<FontSizeOutlined />}
                            //rows={4}
                            placeholder="Ciclo de vida"
                            value={ problemaData.cicloVida }
                            onChange={ e => setProblemaData({ ...problemaData, cicloVida: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
                <Form.Item>
                    <Button type='primary' htmlType='submit' className='btn-submit'>
                        Actualizar problema
                    </Button>
                </Form.Item>
        </Form>
    );
}
