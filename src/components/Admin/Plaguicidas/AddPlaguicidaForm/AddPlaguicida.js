import React, { useState } from 'react';
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { UserAddOutlined, MailOutlined, LinkOutlined} from '@ant-design/icons';
import { getAccessTokenApi } from '../../../../api/auth';
import { postPlaguicidaApi } from '../../../../api/plaguicida';

import "./AddPlaguicida.scss";
import TextArea from 'antd/lib/input/TextArea';

export default function AddPlaguicida( props ) {
    const { setIsVisibleModal, setReloadPlaguicidas } = props;
    const [ plaguicidaData, setPlagucidaData ] = useState({});

  const addPlaguicidas = event => {
    event.preventDefault();
    if( !plaguicidaData.nombre || !plaguicidaData.registroIca || !plaguicidaData.comercializador
        || !plaguicidaData.tipoRegistro || !plaguicidaData.titularRegistro || !plaguicidaData.clasePlaguicida
        || !plaguicidaData.categoriaToxicologica || !plaguicidaData.formulacion ){
            notification["error"]({
                message: "Los campos son obligatorios"
            });
        } else {
            const token = getAccessTokenApi();
            postPlaguicidaApi(token, plaguicidaData ).then( response => {
                notification["success"]({
                    message: response
                });
                setIsVisibleModal(false);
                setReloadPlaguicidas(true);
                setPlagucidaData({});
            }).catch( err => {
                notification["error"]({
                    message: err
                });
            });
        }
  }

  return (
    <div className='add-plaguicida-form'>
        <AddForm
            plaguicidaData={plaguicidaData}
            setPlagucidaData={setPlagucidaData}
            addPlaguicidas={addPlaguicidas}
        />
    </div>
  )
}

function AddForm( props ) {
    const { plaguicidaData, setPlagucidaData, addPlaguicidas } = props;
    const { Option } = Select;

    return (
        <Form className="form-add" onSubmitCapture={addPlaguicidas} >
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="Nombre"
                            value={plaguicidaData.nombre}
                            onChange ={ e => setPlagucidaData({...plaguicidaData , nombre: e.target.value })}
                         />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="Registro Ica"
                            value={plaguicidaData.registroIca}
                            onChange ={ e => setPlagucidaData({...plaguicidaData , registroIca: e.target.value })}
                         />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="Tipo registro"
                            value={plaguicidaData.tipoRegistro}
                            onChange ={ e => setPlagucidaData({...plaguicidaData , tipoRegistro: e.target.value })}
                         />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="Comercializador"
                            value={plaguicidaData.comercializador}
                            onChange ={ e => setPlagucidaData({...plaguicidaData , comercializador: e.target.value })}
                         />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="Titular registro"
                            value={plaguicidaData.titularRegistro}
                            onChange ={ e => setPlagucidaData({...plaguicidaData , titularRegistro: e.target.value })}
                         />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="Recomendaciones"
                            value={plaguicidaData.recomendaciones}
                            onChange ={ e => setPlagucidaData({...plaguicidaData , recomendaciones: e.target.value })}
                         />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="Clase plaguicida"
                            value={plaguicidaData.clasePlaguicida}
                            onChange ={ e => setPlagucidaData({...plaguicidaData , clasePlaguicida: e.target.value })}
                         />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="Tipo vigencia"
                            value={plaguicidaData.tipoVigencia}
                            onChange ={ e => setPlagucidaData({...plaguicidaData , tipoVigencia: e.target.value })}
                         />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="Categoria toxicologica"
                            value={plaguicidaData.categoriaToxicologica}
                            onChange ={ e => setPlagucidaData({...plaguicidaData , categoriaToxicologica: e.target.value })}
                         />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            placeholder="Observaciones"
                            value={plaguicidaData.observaciones}
                            onChange ={ e => setPlagucidaData({...plaguicidaData , observaciones: e.target.value })}
                         />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <TextArea
                            placeholder="Formulacion"
                            rows={5}
                            value={plaguicidaData.formulacion}
                            onChange ={ e => setPlagucidaData({...plaguicidaData , formulacion: e.target.value })}
                         />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <TextArea
                            rows={5}
                            placeholder="Descripcion"
                            value={plaguicidaData.descripcion}
                            onChange ={ e => setPlagucidaData({...plaguicidaData , descripcion: e.target.value })}
                         />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit"> Crear Plaguicida </Button>
            </Form.Item>
        </Form>
    )
}
