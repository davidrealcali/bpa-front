import React,{ useEffect, useState } from 'react';
import { Col, Input, Button, Row, Form} from "antd";

const { TextArea } = Input;

export default function ViewIngredienteForm(props) {
  const { ingrediente, setIsVisibleModal } = props;
  const [ ingredienteData, setIngredienteData ] = useState({});

  useEffect(() => {
     setIngredienteData(ingrediente);
  }, [ingrediente]);
  
  return (
    <div>
        <ViewIngrediente
            ingredienteData={ingredienteData}
            setIsVisibleModal={setIsVisibleModal}
            disabled={true}
        />
    </div>
  )
}

function ViewIngrediente(props){
    const { ingredienteData, setIsVisibleModal, disabled } = props;
    return (
    <Form className="form-edit">
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Nombre"
                        value={ingredienteData.nombre}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Año Mercadeo"
                        value={ingredienteData.agnoMercado}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
             <Col span={12}>
                <Form.Item>
                    <TextArea rows={4}
                      placeholder="Efecto abejas"
                      value={ingredienteData.efectoAbejas}
                      readOnly={true}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <TextArea rows={4}
                      placeholder="Efecto aves"
                      value={ingredienteData.efectoAves}
                      readOnly={true}
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
             <Col span={12}>
                <Form.Item>
                    <TextArea rows={4}
                      placeholder="Efecto acuatico"
                      value={ingredienteData.efectoAcuatico}
                      readOnly={true}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <TextArea rows={4}
                      placeholder="Efecto lombrices"
                      value={ingredienteData.efectoLombrices}
                      readOnly={true}
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
             <Col span={12}>
                <Form.Item>
                    <TextArea rows={4}
                      placeholder="Efecto bacterias"
                      value={ingredienteData.efectoBacterias}
                      readOnly={true}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <TextArea rows={4}
                      placeholder="Efecto microorganismos"
                      value={ingredienteData.efectoMicroorganismos}
                      readOnly={true}
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Solubilidad"
                        value={ingredienteData.solubilidad}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Presio vapor"
                        value={ingredienteData.presionVapor}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Grupo quimico"
                        value={ingredienteData.grupoQuimico}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Clase"
                        value={ingredienteData.clase}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Peso molecular"
                        value={ingredienteData.pesoMolecular}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Punto fusion"
                        value={ingredienteData.puntoFusion}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Punto flamabilidad"
                        value={ingredienteData.puntoFlamabilidad}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Formula estructural"
                        value={ingredienteData.formulaEstructural}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Adsorcion suelo"
                        value={ingredienteData.adsorcionSuelo}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Vida Media"
                        value={ingredienteData.vidaMedia}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Dosis letal oral"
                        value={ingredienteData.dosisLetalOral}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Dosis letal dermal"
                        value={ingredienteData.dosisLetalDermal}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <TextArea
                       rows={4}
                        placeholder="Modo accion"
                        value={ingredienteData.modoAccion}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <TextArea
                        rows={4}
                        placeholder="Mecanismo accion"
                        value={ingredienteData.mecanismoAccion}
                        disabled={disabled}
                        readOnly={true}
                     />
                </Form.Item>
            </Col>
        </Row>
    </Form>
    )
}
