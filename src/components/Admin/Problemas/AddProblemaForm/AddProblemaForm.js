import React, { useState } from 'react';
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import "./AddProblemaForm.scss";
import { getAccessTokenApi } from '../../../../api/auth';
import { postProblemaApi } from '../../../../api/problema';
import TextArea from 'antd/lib/input/TextArea';

export default function AddProblemaForm( props ) {
  const { setIsVisibleModal, setReloadProblemas } = props;
  const [ problemaData, setProblemaData ] = useState({});

const addProblemas = event => {
  event.preventDefault();
  if( !problemaData.nombreComun || !problemaData.nombreCientifico || !problemaData.comentarios
      || !problemaData.categoriaProblema || !problemaData.sintomas || !problemaData.cicloVida ){
          notification["error"]({
              message: "Los campos son obligatorios"
          });
      } else {
          const token = getAccessTokenApi();
          postProblemaApi(token, problemaData ).then( response => {
              notification["success"]({
                  message: response
              });
              setIsVisibleModal(false);
              setReloadProblemas(true);
              setProblemaData({});
          }).catch( err => {
              notification["error"]({
                  message: err
              });
          });
      }
}

  return (
    <div className='add-problema-form'>
        <AddForm
            problemaData={problemaData}
            setProblemaData={setProblemaData}
            addProblemas={addProblemas}
        />
    </div>
  )
}

function AddForm( props ) {
  const { problemaData, setProblemaData, addProblemas } = props;
  const { Option } = Select;

  return (
      <Form className="form-add" onSubmitCapture={addProblemas} >
          <Row gutter={24}>
              <Col span={12}>
                  <Form.Item>
                      <Input
                          placeholder="Nombre comun"
                          value={problemaData.nombreComun}
                          onChange ={ e => setProblemaData({...problemaData , nombreComun: e.target.value })}
                       />
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item>
                      <Input
                          placeholder="Nombre cientifico"
                          value={problemaData.nombreCientifico}
                          onChange ={ e => setProblemaData({...problemaData , nombreCientifico: e.target.value })}
                       />
                  </Form.Item>
              </Col>
          </Row>
          <Row gutter={24}>
              <Col span={12}>
                  <Form.Item>
                      <Input
                          placeholder="Comentarios"
                          value={problemaData.comentarios}
                          onChange ={ e => setProblemaData({...problemaData , comentarios: e.target.value })}
                       />
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item>
                      <Select
                            placeholder="Categoria problema"
                            onChange={ e => setProblemaData({ ...problemaData, categoriaProblema: e })}
                            value={problemaData.categoriaProblema} >
                            <Option value="enfermedades">Enfermedades</Option>
                            <Option value="bacteria">Bacterias</Option>
                        </Select>
                  </Form.Item>
              </Col>
          </Row>
          <Row gutter={24}>
              <Col span={12}>
                  <Form.Item>
                      <TextArea
                          placeholder="Sintomas"
                          rows={5}
                          value={problemaData.sintomas}
                          onChange ={ e => setProblemaData({...problemaData , sintomas: e.target.value })}
                       />
                  </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item>
                      <TextArea
                          placeholder="Ciclo de vida"
                          rows={5}
                          value={problemaData.cicloVida}
                          onChange ={ e => setProblemaData({...problemaData , cicloVida: e.target.value })}
                       />
                  </Form.Item>
              </Col>
          </Row>
          <Form.Item>
              <Button type="primary" htmlType="submit" className="btn-submit"> Crear Problema </Button>
          </Form.Item>
      </Form>
  )
}
