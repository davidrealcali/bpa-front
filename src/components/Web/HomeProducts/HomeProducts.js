import React from 'react';
import {Row, Col, Card, Button } from "antd";
import {Link} from "react-router-dom";
import reactJsHooks from  "../../../assets/img/jpg/2Acelga.jpeg";
import reactNative from  "../../../assets/img/jpg/3Achiote.jpg";
import wordPress from  "../../../assets/img/jpg/4Aguacate.jpg";
import javasScript from  "../../../assets/img/jpg/7Aji.jpg";
import prestaShop from  "../../../assets/img/jpg/8Ajo.jpg";
import cssGrid from  "../../../assets/img/jpg/10Albahaca.jpg";

import "./HomeProducts.scss";

export default function HomeProducts() {
  return (
    <Row className='home-courses'>
        <Col lg={24} className="home-courses__title">
            <h2>Nuestros productos</h2>
        </Col>
        <Col lg={4}/>
        <Col lg={16}>
            <Row className='row-courses'>
                <Col md={6}> 
                    <CardCourse
                        image={reactJsHooks}
                        title="Acelga"
                        subtitle="Acelga"
                        link="https://google.com"
                    />
                </Col>
                <Col md={6}> 
                    <CardCourse
                        image={reactJsHooks}
                        title="Achiote"
                        subtitle="Achiote"
                        link="https://google.com"
                    />
                </Col>
                <Col md={6}> 
                    <CardCourse
                        image={reactJsHooks}
                        title="Alcachofa"
                        subtitle="Alcachofa"
                        link="https://google.com"
                    />
                </Col>
                <Col md={6}> 
                    <CardCourse
                        image={reactJsHooks}
                        title="Alcachofa"
                        subtitle="Alcachofa"
                        link="https://google.com"
                    />
                </Col>
            </Row>
            <Row className='row-courses'>
                 <Col md={6}> 
                    <CardCourse
                        image={reactJsHooks}
                        title="Aguacate"
                        subtitle="Aguacate"
                        link="https://google.com"
                    />
                </Col>
                <Col md={6}/>
                <Col md={6}/>
                <Col md={6}>
                    <CardCourse
                        image={reactJsHooks}
                        title="Ajenjo"
                        subtitle="Ajenjo"
                        link="https://google.com"
                    />
                </Col>
            </Row>
        </Col>
        <Col lg={4}/>
        <Col lg={24} className="home-courses__more">
            <Link to="/productos">
                <Button>Ver mas</Button>
            </Link>
        </Col>
    </Row>
  )
}

function CardCourse ( props ) {
    const { image, title , subtitle, link } = props;
    const { Meta } = Card;

    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Card 
                className='home-courses__card'
                cover={<img src={image} alt={title } />}
                actions={[<Button>Ingresar</Button>]}
            >   
                ....
                <Meta title={title} description={subtitle} />
            </Card>       
        </a>
    )
}
