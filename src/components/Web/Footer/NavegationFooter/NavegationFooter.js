import React from 'react';
import { Row, Col } from "antd";
import { BookOutlined, CodeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import "./NavegationFooter.scss";


export default function NavegationFooter() {
  return (
    <Row className="navigation-footer">
        <Col>
            <h3>Navegación</h3>
        </Col>
        <Col md={12}>
            ...
        </Col>
        <Col md={12}> <RenderListLeft/> </Col>
        <Col md={12}> <RenderListRight /> </Col>
    </Row>
  )
}

function RenderListLeft() {
    return (
        <ul>
            <li>
                <a href='#'>
                    <BookOutlined /> 
                    Cursos online
                </a> 
            </li>
            <li>
                <a href='#'>
                    <BookOutlined /> 
                    Cursos online
                </a> 
            </li>
            <li>
                <a href='#'>
                    <BookOutlined /> 
                    Cursos online
                </a> 
            </li>
            <li>
                <a href='#'>
                    <BookOutlined /> 
                    Cursos online
                </a> 
            </li>  
        </ul>
    )
}

function RenderListRight() {
    return (
        <ul>
            <li>
                <a href='#'>
                    <BookOutlined /> 
                    Cursos online
                </a> 
            </li>
            <li>
                <a href='#'>
                    <BookOutlined /> 
                    Cursos online
                </a> 
            </li>
            <li>
                <a href='#'>
                    <BookOutlined /> 
                    Cursos online
                </a> 
            </li>
            <li>
                <a href='#'>
                    <BookOutlined /> 
                    Cursos online
                </a> 
            </li>  
        </ul>
    )
}