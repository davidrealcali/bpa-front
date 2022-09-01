import React from 'react';
import { Row, Col, Card } from "antd";
import { ClockCircleOutlined } from '@ant-design/icons';

import "./HowMyProductsWork.scss";

export default function HowMyProductsWork() {
  return (
    <Row className='how-my-products-work'>
        <Col lg={24} className="how-my-products-work__title">
                <h2>Como funcionan mis productos</h2>
                <h3>
                    Maecenas neque turpis, rhoncus et ultricies at, elementum eget lacus. 
                    Phasellus id tellus et diam commodo malesuada ullamcorper quis quam. Aenean et 
                </h3>
        </Col>
        <Col lg={4}/>
        <Col lg={16}>
            <Row className='row-cards'>
                <Col md={8}>
                    <CardInfo 
                        title="Productos"
                        description="Donec non libero at erat ullamcorper tempor. Morbi at sodales nisi. Fusce metus leo, posuere sed vulputate a, "
                    />
                </Col>
                <Col md={8}>
                    <CardInfo 
                        title="Productos"
                        description="Donec non libero at erat ullamcorper tempor. Morbi at sodales nisi. Fusce metus leo, posuere sed vulputate a, "
                    />
                </Col>
                <Col md={8}>
                    <CardInfo 
                        title="Productos"
                        description="Donec non libero at erat ullamcorper tempor. Morbi at sodales nisi. Fusce metus leo, posuere sed vulputate a, "
                    />
                </Col>
            </Row>
            <Row className='row-cards'>
                <Col md={8}>
                    <CardInfo 
                        title="Productos"
                        description="Donec non libero at erat ullamcorper tempor. Morbi at sodales nisi. Fusce metus leo, posuere sed vulputate a, "
                    />
                </Col>
                <Col md={8}>
                    <CardInfo 
                        title="Productos"
                        description="Donec non libero at erat ullamcorper tempor. Morbi at sodales nisi. Fusce metus leo, posuere sed vulputate a, "
                    />
                </Col>
                <Col md={8}>
                    <CardInfo 
                        title="Productos"
                        description="Donec non libero at erat ullamcorper tempor. Morbi at sodales nisi. Fusce metus leo, posuere sed vulputate a, "
                    />
                </Col>
            </Row>
        </Col>
        <Col lg={4}/>
    </Row>
  )
}

function CardInfo( props ) {
    const { title, description } = props;
    const { Meta } = Card;

    return (
        <Card className='how-my-products-work__card'>
            <ClockCircleOutlined />
            <Meta title={title} description={description} />
        </Card>
    )
}
