import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { getAccessTokenApi } from '../../../../api/auth';
import { updatePlaguicidas } from '../../../../api/plaguicida';

const { TextArea } = Input;

export default function EditPlaguicidaForm(props) {
  const { setIsVisibleModal, setReloadPlaguicidas, plaguicida }  = props;
  const [ plaguicidaData, setPlaguicidaData ] = useState({});
  
  useEffect( () => {
    setPlaguicidaData(plaguicida)
}, [plaguicida]);

  const editPlaguicida = event => {

     if ( !plaguicidaData.nombre || !plaguicidaData.registroIca || !plaguicidaData.tipoRegistro ||
          !plaguicidaData.comercializador || !plaguicidaData.titularRegistro || !plaguicidaData.recomendaciones || 
          !plaguicidaData.clasePlaguicida || !plaguicidaData.tipoVigencia || !plaguicidaData.categoriaToxicologica 
           || !plaguicidaData.formulacion || !plaguicidaData.descripcion ) {
                notification["error"]({
                    message: "Los campos son obligatorios"
                });
          } else {
              const token = getAccessTokenApi();
              updatePlaguicidas( token, plaguicidaData.uid, plaguicidaData ).then( response => {
                        notification["success"]({
                            message : response
                        });
                        setIsVisibleModal(false);
                        setReloadPlaguicidas(true);
              }).catch( err => {
                    notification["error"]({
                        message : err
                    });
              });
          }
  }

  return (
    <div className="edit-menu-web-form">
        <EditPlaguiForm 
            plaguicidaData={plaguicidaData}
            setPlaguicidaData={setPlaguicidaData}
            editPlaguicida={editPlaguicida}
        />
    </div>
  )
}

function EditPlaguiForm( props ) {
    const { plaguicidaData, setPlaguicidaData, editPlaguicida } = props;
    const { Option } = Select;
    
    return (
        <Form className="form-edit" onSubmitCapture={editPlaguicida}>
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input 
                    // prefix={<FontSizeOutlined />}
                        placeholder="Nombre"
                        value={ plaguicidaData.nombre }
                        onChange={ e => setPlaguicidaData({ ...plaguicidaData, nombre: e.target.value })}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input 
                        //prefix={<LinkOutlined />}
                        placeholder="Registro Ica"
                        value={ plaguicidaData.registroIca }
                        onChange={ e => setPlaguicidaData({ ...plaguicidaData, registroIca: e.target.value })}
                    />
                </Form.Item>
            </Col>
        </Row>    
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input 
                        //prefix={<LinkOutlined />}
                        placeholder="Tipo registro"
                        value={ plaguicidaData.tipoRegistro }
                        onChange={ e => setPlaguicidaData({ ...plaguicidaData, tipoRegistro: e.target.value })}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input 
                        //prefix={<LinkOutlined />}
                        placeholder="Comercializador"
                        value={ plaguicidaData.comercializador }
                        onChange={ e => setPlaguicidaData({ ...plaguicidaData, comercializador: e.target.value })}
                    />
                </Form.Item>
            </Col>
        </Row>  
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        //prefix={<LinkOutlined />}
                        placeholder="Titular registro"
                        value={ plaguicidaData.titularRegistro }
                        onChange={ e => setPlaguicidaData({ ...plaguicidaData, titularRegistro: e.target.value })}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                 <Form.Item>
                    <TextArea
                        //prefix={<LinkOutlined />}
                        placeholder="Recomendaciones"
                        value={ plaguicidaData.recomendaciones }
                        onChange={ e => setPlaguicidaData({ ...plaguicidaData, recomendaciones: e.target.value })}
                    />
                </Form.Item>
            </Col>
        </Row>  
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Select 
                        //prefix={<LinkOutlined />}
                        placeholder="Clase plaguicida"
                        value={ plaguicidaData.clasePlaguicida }
                        onChange={ e => setPlaguicidaData({ ...plaguicidaData, clasePlaguicida: e })} >
                        <Option value="HerbicidaI">Herbicida I</Option>
                        <Option value="HerbicidaII">Herbicida II</Option>
                    </Select>
                </Form.Item>   
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Select 
                        //prefix={<LinkOutlined />}
                        placeholder="Tipo vigencia"
                        value={ plaguicidaData.tipoVigencia }
                        onChange={ e => setPlaguicidaData({ ...plaguicidaData, tipoVigencia: e.target.value })} >
                        <Option value="Cancelado">Cancelado</Option>
                        <Option value="Activo">Activo</Option>
                    </Select>
                </Form.Item>   
            </Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>
                    <Form.Item>
                        <Select 
                            //prefix={<LinkOutlined />}
                            placeholder="Categoria toxicologica"
                            value={ plaguicidaData.categoriaToxicologica }
                            onChange={ e => setPlaguicidaData({ ...plaguicidaData, categoriaToxicologica: e })} >
                            <Option value="H11">H11</Option>
                            <Option value="H22">H22</Option>
                        </Select>
                    </Form.Item>   
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <TextArea 
                            //prefix={<LinkOutlined />}
                            rows={4}
                            placeholder="Observaciones"
                            value={ plaguicidaData.observaciones }
                            onChange={ e => setPlaguicidaData({ ...plaguicidaData, observaciones: e.target.value })}
                        />
                    </Form.Item>   
                </Col>
        </Row>
        <Row gutter={24}>
           <Col span={12}>
                <Form.Item>
                    <TextArea
                        //prefix={<LinkOutlined />}
                        rows={4}
                        placeholder="Formulacion"
                        value={ plaguicidaData.formulacion }
                        onChange={ e => setPlaguicidaData({ ...plaguicidaData, formulacion: e.target.value })}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <TextArea
                        //prefix={<LinkOutlined />}
                        rows={4}
                        placeholder="Titular registro"
                        value={ plaguicidaData.descripcion }
                        onChange={ e => setPlaguicidaData({ ...plaguicidaData, descripcion: e.target.value })}
                    />
                </Form.Item>
            </Col>
        </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar plaguicida
                </Button>
            </Form.Item>
        </Form>
    )
}
