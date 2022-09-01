import React , { useState } from "react";
import { Layout } from "antd";
import { Route, Switch, Redirect } from "react-router-dom"; 
import "./LayoutAdmin.scss";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSigIn from '../pages/Admin/SignIn/SignIn';
import useAuth from "../hooks/useAuth";


export default function LayoutAdmin(props) {
    const { routes } = props;
    const [ menuCollapsed, setMenuCollapsed ] = useState(true);
    const { Header, Content, Footer } = Layout;
    const { user ,isLoading } = useAuth();
   
    if( !user  ) {
         return (
            <>
               <Route path="/admin/login" component={AdminSigIn} />
               <Redirect to="/admin/login"/>
            </>
         )
    }

    if( user && !isLoading ) {
      return (
         <Layout>
             <MenuSider menuCollapsed={menuCollapsed} />
              <Layout className="layout-admin">
                 <Header className="layout-admin__header"> 
                    <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed}/>
                 </Header>
                 <Content className="layout-admin__content">
                      <LoadRoutes routes={routes} />
                 </Content>
                 <Footer className="layout-admin__footer">Cristian David Otalvaro</Footer>
              </Layout>
         </Layout>
     )
   }
   return null;
}

function LoadRoutes( { routes } ) {
 return (
    <Switch>
     {routes.map((route, index ) => (
        <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
        />
     ))}
    </Switch>
 );  
}