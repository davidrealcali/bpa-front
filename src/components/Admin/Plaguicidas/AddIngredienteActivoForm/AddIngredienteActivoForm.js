import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { postIngredientePlaguicidaApi } from '../../../../api/plaguicida';
import { getAccessTokenApi } from '../../../../api/auth';

const { TextArea } = Input;

export default function AddIngredienteActivoForm(props) {
  const { plaguicidas, ingredientes, setIsVisibleModal  } = props;
  const [ reloadPlaguicidas, setReloadPlaguicidas ] = useState(false);
  const [ plaguicidaData, setPlaguicidaData ] = useState({});
  const [ ingredienteData, setIngredienteData ] = useState({});
  const [ ingredientePlaguicida, setIngredientePlaguicida ] = useState({});

 const addIngredientePlaguicida = (event) => {
    if( !plaguicidaData.plaguicida || !ingredienteData.ingrediente[0] ) {
        notification['error']({
            message: "Debe seleccionar los campos"
        });
    } else {
        ingredientePlaguicida.plaguicida =  plaguicidaData.plaguicida;
        ingredientePlaguicida.ingrediente = ingredienteData.ingrediente;
        ingredientePlaguicida.observaciones = plaguicidaData.observaciones;
        ingredientePlaguicida.concentracion = plaguicidaData.concentracion;
        setIngredientePlaguicida(ingredientePlaguicida);

        const token = getAccessTokenApi();

        ingredientePlaguicida.ingrediente.forEach( element => {
            ingredientePlaguicida.ingrediente = element;
            postIngredientePlaguicidaApi(token, ingredientePlaguicida ).then( response => {
                notification["success"]({
                    message: response
                });
                setIsVisibleModal(false);
                setPlaguicidaData({});
                setIngredienteData({})
                setIngredientePlaguicida({});
                setReloadPlaguicidas(false);
            }).catch( err => {
                notification["error"]({
                    message: err
                });
            });
        });
    };
 }

  return (
    <div className="edit-menu-web-form">
        <IngredienteAddForm
            plaguicidas={plaguicidas}
            ingredientes={ingredientes}
            setPlaguicidaData={ setPlaguicidaData }
            plaguicidaData={plaguicidaData}
            setIngredienteData={setIngredienteData}
            ingredienteData={ingredienteData}
            addIngredientePlaguicida={addIngredientePlaguicida}
        />
    </div>
  )
}

function IngredienteAddForm( props ) {
    const { plaguicidas, ingredientes,
            setIngredienteData, setPlaguicidaData,
            ingredienteData, plaguicidaData,
            addIngredientePlaguicida } = props;

    const { Option } = Select;
    const children = []; 
    const children2= [];

    plaguicidas.forEach(element => {
       element.key = element.uid;
       children.push(<Option nombre={element.nombre} key={ element.key }> { element.nombre } </Option>)
    });

    ingredientes.forEach(element => {
        element.key = element.uid;
        children2.push(<Option nombre={element.nombre} key={ element.key }> { element.nombre } </Option>);
    });
    
    return (
    <Form className="form-edit" onSubmitCapture={addIngredientePlaguicida}>
        <Row gutter={24}>
             <Col span={12}>
                <Form.Item>
                    <Select style={{ width:"100%" }} 
                        placeholder="Seleccione un plaguicida"
                        showSearch
                        optionFilterProp="children"
                        value={ plaguicidaData.plaguicida }
                        onChange={e => setPlaguicidaData({...plaguicidaData, plaguicida: e })} 
                        filterOption={(input, option) =>  
                            option.props.children.indexOf(input) >= 0 
                           || option.props.nombre.indexOf(input) >= 0
                          }
                        >
                        {children}
                    </Select>
                </Form.Item>
             </Col>
             <Col span={12}>
                <Form.Item>
                    <Select mode="tags" 
                        style={{ width:"100%" }} 
                        value={ ingredienteData.ingrediente }
                        onChange={e => setIngredienteData({...ingredienteData, ingrediente: e })} 
                        placeholder="Seleccione un ingrediente"
                        >
                            {children2}
                    </Select>
                </Form.Item>
             </Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        placeholder="Concentracion"
                        value={ plaguicidaData.concentracion}
                        onChange={e => setPlaguicidaData({...plaguicidaData, concentracion: e.target.value })}
                    />  
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <TextArea
                        placeholder="Observaciones"
                        value={ plaguicidaData.observaciones }
                        onChange={e => setPlaguicidaData({...plaguicidaData, observaciones: e.target.value })}
                    />   
                </Form.Item> 
            </Col>   
        </Row>   
        <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-submit"> Adicionar </Button>
        </Form.Item>
    </Form>
   );
}


