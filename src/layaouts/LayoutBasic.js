import React from "react";
import { Row, Col } from "antd";
import { Route, Switch } from "react-router-dom";
import './LayoutBasic.scss';
import MenuTop from "../components/Web/MenuTop";
import Footer from "../components/Web/Footer/Footer";

export default function LayoutBasic ( props ) {
  const { routes } = props;

  return (  
    <>
      <Row>
        <Col md={4} />
        <Col md={16}>
          <MenuTop />   
        </Col>
        <Col md={4}/>
      </Row>
      <LoadRoutes routes={routes} />
      <Footer/>
    </>
  )
}

function LoadRoutes( { routes } ) {
    return (
      <Switch>
            {routes.map((route,index) => (
            <Route
                key={index}
                path={route.path}
                component={route.component}
                exact={route.exact}
            />
            ))}
      </Switch>
    )
}