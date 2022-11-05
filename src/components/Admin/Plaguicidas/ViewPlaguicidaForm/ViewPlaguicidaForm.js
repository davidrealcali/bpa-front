import React,{ useEffect, useState } from 'react';
import { Col, Input, Button, Row, Form, List} from "antd";

import "./ViewPlaguicidaForm.scss";
import { getAccessTokenApi } from '../../../../api/auth';
import { getIngredientePlaguicidaApi } from '../../../../api/plaguicida';

const { TextArea } = Input;

export default function ViewPlaguicidaForm(props) {
  const { setIsVisibleModal, setReloadPlaguicidas, plaguicida } = props;
  const [ plaguicidaData , setPlaguicidaData ] = useState({});
  const [ ingredienteData, setIngredienteData ] = useState({});
  
  const token = getAccessTokenApi();

  useEffect(() => {
     setPlaguicidaData(plaguicida);
  }, [plaguicida]);

  useEffect(() => {
    getIngredientePlaguicidaApi(token, plaguicida.uid ).then( response => {
        setIngredienteData(response.data)
    });
  }, [token, plaguicidaData]);
  
  return (
    <div>
        <ViewPlaguicida
            plaguicidaData={plaguicidaData}
            setIsVisibleModal={setIsVisibleModal}
            disabled={true}
            ingredienteData={ingredienteData}
        />
    </div>
  )
}

function ViewPlaguicida( props ) {
    const { plaguicidaData, disabled, ingredienteData } = props;
    const data = [];
    let textoIngrediente = "";
    console.log(ingredienteData);
    if( Object.keys(ingredienteData).length > 0 ) {
        ingredienteData.forEach((element,index) => {
            data.push(element.ingrediente);
            textoIngrediente+= `${index + 1 }. ${element.ingrediente.nombre}
    Concentracion: ${element.concentracion}
    Observaciones: ${element.observaciones +"\n"}`;
        });
    } else {
        textoIngrediente = 'No contiene';
    }

    return (
    <Form className="form-edit">
        <Row gutter={15}>
            <Col span={12}>
                <Form.Item>
                    <Input 
                    // prefix={<FontSizeOutlined />}
                        placeholder="Nombre"
                        value={ plaguicidaData.nombre }
                        readOnly={true}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input 
                        //prefix={<LinkOutlined />}
                        placeholder="Registro Ica"
                        value={ plaguicidaData.registroIca }
                        readOnly={true}
                    />
                </Form.Item>
            </Col>
        </Row>    
        <Row gutter={15}>
            <Col span={12}>
                <Form.Item>
                    <Input 
                        //prefix={<LinkOutlined />}
                        placeholder="Tipo registro"
                        value={ plaguicidaData.tipoRegistro }
                        readOnly={true}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input 
                        //prefix={<LinkOutlined />}
                        placeholder="Comercializador"
                        value={ plaguicidaData.comercializador }
                        readOnly={true}
                    />
                </Form.Item>
            </Col>
        </Row>  
        <Row gutter={15}>
            <Col span={12}>
                <Form.Item>
                    <Input
                        //prefix={<LinkOutlined />}
                        placeholder="Titular registro"
                        value={ plaguicidaData.titularRegistro }
                        readOnly={true}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                 <Form.Item>
                    <TextArea
                        //prefix={<LinkOutlined />}
                        placeholder="Recomendaciones"
                        value={ plaguicidaData.recomendaciones }
                        readOnly={true}
                    />
                </Form.Item>
            </Col>
        </Row>  
        <Row gutter={15}>
            <Col span={12}>
                <Form.Item>
                    <Input 
                        //prefix={<LinkOutlined />}
                        placeholder="Clase plaguicida"
                        value={ plaguicidaData.clasePlaguicida }
                        readOnly={true}
                    />
                </Form.Item>   
            </Col>
            <Col span={12}>
                <Form.Item>
                    <Input 
                        //prefix={<LinkOutlined />}
                        placeholder="Tipo vigencia"
                        value={ plaguicidaData.tipoVigencia }
                        readOnly={true}        
                    />
                </Form.Item>   
            </Col>
        </Row>
        <Row gutter={15}>
            <Col span={12}>
                    <Form.Item>
                        <Input
                            //prefix={<LinkOutlined />}
                            placeholder="Categoria toxicologica"
                            value={ plaguicidaData.categoriaToxicologica }
                            readOnly={true}
                       />
                    </Form.Item>   
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <TextArea 
                            //prefix={<LinkOutlined />}
                            rows={4}
                            placeholder="Observaciones"
                            value={ plaguicidaData.observaciones }
                            readOnly={true}
                        />
                    </Form.Item>   
                </Col>
        </Row>
        <Row gutter={15}>
           <Col span={12}>
                <Form.Item>
                    <TextArea
                        //prefix={<LinkOutlined />}
                        rows={4}
                        placeholder="Formulacion"
                        value={ plaguicidaData.formulacion }
                        readOnly={true}
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
                        readOnly={true}
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={15}>
            <Col style={{width:"100%", margin:"center" }}>
              <p style={{textAlign:"center", fontWeight:"bold", fontSize:"50", overflow:"auto"}}> Ingredientes activos</p>
              <Form.Item>
                      <TextArea rows={4}
                        style={{width:"100%"}}
                        readOnly={true}
                        placeholder="Ingredientes activos"
                        value={textoIngrediente} 
                      />
              </Form.Item>  
            </Col>
        </Row>

    </Form>
    );
 }
