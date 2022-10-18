import React, { useEffect,useState}  from 'react';
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { getAccessTokenApi } from '../../../../api/auth';
import { updateIngredientes } from '../../../../api/ingrediente';
import { decodeRolJWT } from '../../../../utils/formValidation';

const { TextArea } = Input;

export default function EditIngredienteForm( props ) {
   const { setIsVisibleModal, setReloadIngredientes, ingrediente } = props;
   const [ ingredienteData, setIngredienteData ] = useState({});

   useEffect(() => {
     setIngredienteData(ingrediente);
   }, [ingrediente]);

   const editIngrediente = event => {
    event.preventDefault();
    if (!ingredienteData.nombre || !ingredienteData.agnoMercado || !ingredienteData.efectoAbejas ||
        !ingredienteData.efectoAves || !ingredienteData.efectoAcuatico || !ingredienteData.efectoLombrices ||
        !ingredienteData.efectoBacterias || !ingredienteData.efectoMicroorganismos || !ingredienteData.solubilidad ||
        !ingredienteData.presionVapor || !ingredienteData.grupoQuimico || !ingredienteData.clase || 
        !ingredienteData.pesoMolecular || !ingredienteData.puntoFusion || !ingredienteData.puntoFlamabilidad || 
        !ingredienteData.formulaEstructural || !ingredienteData.adsorcionSuelo || !ingredienteData.vidaMedia ||
        !ingredienteData.dosisLetalOral || !ingredienteData.dosisLetalDermal || !ingredienteData.modoAccion ||
        !ingredienteData.mecanismoAccion  ) {
            notification["error"]({
                message: "Los campos son obligatorios"
            });
        } else {
            const token = getAccessTokenApi();
            updateIngredientes( token, ingredienteData.uid, ingredienteData ).then( response => {
                notification["success"]({
                    message: response
                });
                setIsVisibleModal(false);
                setReloadIngredientes(true);
                setIngredienteData({});
            }).catch( err => {
                notification["error"]({
                    message: err
                });
            });
        }
   }
   
  return (
    <div className='edit-ingrediente-form'>
        <EditarIngredienteForm
            ingredienteData={ingredienteData}
            setIngredienteData={setIngredienteData}
            editIngrediente={editIngrediente}
        />
    </div>
  )
}

function EditarIngredienteForm( props ) {
    const { ingredienteData, setIngredienteData, editIngrediente } = props;
    const { Option } = Select;

    return (
        <Form className="add-ingrediente-form" onSubmitCapture={editIngrediente}>
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Nombre"
                        value={ingredienteData.nombre}
                        onChange ={ e => setIngredienteData({...ingredienteData , nombre: e.target.value })}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Año Mercadeo"
                        value={ingredienteData.agnoMercado}
                        onChange ={ e => setIngredienteData({...ingredienteData ,agnoMercado: e.target.value })}
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
                      onChange ={ e => setIngredienteData({...ingredienteData , efectoAbejas: e.target.value })}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <TextArea rows={4}
                      placeholder="Efecto aves"
                      value={ingredienteData.efectoAves}
                      onChange ={ e => setIngredienteData({...ingredienteData , efectoAves: e.target.value })}
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
                      onChange ={ e => setIngredienteData({...ingredienteData , efectoAcuatico: e.target.value })}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <TextArea rows={4}
                      placeholder="Efecto lombrices"
                      value={ingredienteData.efectoLombrices}
                      onChange ={ e => setIngredienteData({...ingredienteData , efectoLombrices: e.target.value })}
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
                      onChange ={ e => setIngredienteData({...ingredienteData , efectoBacterias: e.target.value })}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <TextArea rows={4}
                      placeholder="Efecto microorganismos"
                      value={ingredienteData.efectoMicroorganismos}
                      onChange ={ e => setIngredienteData({...ingredienteData , efectoMicroorganismos: e.target.value })}
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
                        onChange ={ e => setIngredienteData({...ingredienteData , solubilidad: e.target.value })}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Presio vapor"
                        value={ingredienteData.presionVapor}
                        onChange ={ e => setIngredienteData({...ingredienteData , presionVapor: e.target.value })}
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
                        onChange ={ e => setIngredienteData({...ingredienteData , grupoQuimico: e.target.value })}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Clase"
                        value={ingredienteData.clase}
                        onChange ={ e => setIngredienteData({...ingredienteData , clase: e.target.value })}
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
                        onChange ={ e => setIngredienteData({...ingredienteData , pesoMolecular: e.target.value })}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Punto fusion"
                        value={ingredienteData.puntoFusion}
                        onChange ={ e => setIngredienteData({...ingredienteData , puntoFusion: e.target.value })}
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
                        onChange ={ e => setIngredienteData({...ingredienteData , puntoFlamabilidad: e.target.value })}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Formula estructural"
                        value={ingredienteData.formulaEstructural}
                        onChange ={ e => setIngredienteData({...ingredienteData , formulaEstructural: e.target.value })}
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
                        onChange ={ e => setIngredienteData({...ingredienteData , adsorcionSuelo: e.target.value })}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Vida Media"
                        value={ingredienteData.vidaMedia}
                        onChange ={ e => setIngredienteData({...ingredienteData , vidaMedia: e.target.value })}
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
                        onChange ={ e => setIngredienteData({...ingredienteData , dosisLetalOral: e.target.value })}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Dosis letal dermal"
                        value={ingredienteData.dosisLetalDermal}
                        onChange ={ e => setIngredienteData({...ingredienteData , dosisLetalDermal: e.target.value })}
                     />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Modo accion"
                        value={ingredienteData.modoAccion}
                        onChange ={ e => setIngredienteData({...ingredienteData , modoAccion: e.target.value })}
                     />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Mecanismo accion"
                        value={ingredienteData.mecanismoAccion}
                        onChange ={ e => setIngredienteData({...ingredienteData , mecanismoAccion: e.target.value })}
                     />
                </Form.Item>
            </Col>
        </Row>
        <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-submit"> Editar Ingrediente Activo </Button>
        </Form.Item>
    </Form>
    )
    
}
