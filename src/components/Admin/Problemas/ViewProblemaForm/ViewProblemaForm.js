import React,{ useEffect, useState } from 'react';
import { Col, Input, Row, Form} from "antd";
import "./ViewProblemaForm.scss";

const { TextArea } = Input;

export default function ViewProblemaForm(props) {
  const { setIsVisibleModal, problema } = props;
  const [ problemaData , setProblemaData ] = useState({});

  useEffect(() => {
     setProblemaData(problema);
  }, [problema]);

  return (
    <div>
        <ViewProblema
            problemaData={problemaData}
            setIsVisibleModal={setIsVisibleModal}
            disabled={true}
        />
    </div>
  )
}

function ViewProblema( props ) {
    const { problemaData, setIsVisibleModal, disabled } = props;

    return (
        <Form className='form-edit'>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                        // prefix={<FontSizeOutlined />}
                            placeholder="Nombre comun"
                            value={ problemaData.nombreComun }
                            readOnly={true}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                         <Input 
                        // prefix={<FontSizeOutlined />}
                            placeholder="Nombre cientifico"
                            value={ problemaData.nombreCientifico }
                            readOnly={true}
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
                            readOnly={true}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                         <Input
                        // prefix={<FontSizeOutlined />}
                            placeholder="Categoria problema"
                            value={ problemaData.categoriaProblema }
                            readOnly={true}
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
                            placeholder="Sintomas"
                            value={ problemaData.sintomas }
                            readOnly={true}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                         <TextArea
                        // prefix={<FontSizeOutlined />}
                            rows={4}
                            placeholder="Ciclo de vida"
                            value={ problemaData.cicloVida }
                            readOnly={true}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
