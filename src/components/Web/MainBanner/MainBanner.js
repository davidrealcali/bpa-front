import React from "react";
import { Row, Col } from "antd";
import "./MainBaner.scss";

export default function MainBanner() {
    return (
        <div className="main-banner">
            <div className="main-banner__dark" />

            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <h2>Aprender nuevas <br/> practicar agricolas </h2>
                    <h3>
                        A traves de nuestra plataforma Datagro
                    </h3>
                </Col>
                <Col lg={4} />
            </Row>
        </div>
    )
}