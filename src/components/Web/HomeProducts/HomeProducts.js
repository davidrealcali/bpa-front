import React from 'react';
import {Row, Col, Card, Button } from "antd";
import {Link} from "react-router-dom";
import reactJsHooks from  "../../../assets/img/jpg/react-js-hooks.jpg";
import reactNative from  "../../../assets/img/jpg/react-native.jpg";
import wordPress from  "../../../assets/img/jpg/wordpress.jpg";
import javasScript from  "../../../assets/img/jpg/javascript-es6.jpg";
import prestaShop from  "../../../assets/img/jpg/prestashop-1-7.jpg";
import cssGrid from  "../../../assets/img/jpg/css-grid.jpg";

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
                        title="React JS Hooks"
                        subtitle="Intermedio React"
                        link="https://google.com"
                    />
                </Col>
                <Col md={6}> 
                    <CardCourse
                        image={reactNative}
                        title="React Native"
                        subtitle="Intermedio React Native"
                        link="https://google.com"
                    />
                </Col>
                <Col md={6}> 
                    <CardCourse
                        image={javasScript}
                        title="JavaScript"
                        subtitle="Javascript es6"
                        link="https://google.com"
                    />
                </Col>
                <Col md={6}> 
                    <CardCourse
                        image={prestaShop}
                        title="Prestashop"
                        subtitle="Prestashop subtitle"
                        link="https://google.com"
                    />
                </Col>
            </Row>
            <Row className='row-courses'>
                 <Col md={6}> 
                    <CardCourse
                        image={wordPress}
                        title="wordPress"
                        subtitle="wordPress"
                        link="https://google.com"
                    />
                </Col>
                <Col md={6}/>
                <Col md={6}/>
                <Col md={6}>
                    <CardCourse
                        image={cssGrid}
                        title="wordPress"
                        subtitle="wordPress"
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
