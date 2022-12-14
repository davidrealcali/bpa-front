import React from 'react';
import { Layout, Row, Col } from 'antd';
import MyInfo from "./MyInfo";
import NavegationFooter from './NavegationFooter/NavegationFooter';
import NewsLetter from '../NewsLetter';

import "./Footer.scss";

export default function Footer() {
const { Footer } = Layout; 

  return (
      <Footer className='footer'>
          <Row>
              <Col md={4}></Col>
              <Col md={16}>
                    <Row className='footer__copyright'>
                        <Col md={8}> <MyInfo /> </Col>
                        <Col md={8}> <NavegationFooter/> </Col>
                        <Col md={8}> <NewsLetter/>  </Col>       
                    </Row>
                    <Row className='footer__copyright'>
                        <Col md={12}>2021 Todos los derechos reservados</Col>
                        <Col md={12}> Cristian David Otalvaro || Developer</Col>
                    </Row>
              </Col>
              <Col md={4}></Col>
          </Row>
      </Footer>
  );
}
