//Layout
import LayoutAdmin from "../layaouts/LayoutAdmin";
import LayoutBasic from "../layaouts/LayoutBasic";
//Admin pages
import AdminHome from '../pages/Admin'
import AdminSingIn from '../pages/Admin/SignIn/SignIn'
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";
import AdminCultivo from  "../pages/Admin/Cultivos";
import AdminPlaguicida from "../pages/Admin/Plaguicidas"
import AdminProblemas from "../pages/Admin/Problemas";
import AdminIngredientes from "../pages/Admin/Ingredientes";
import AdminBlog from "../pages/Admin/Blog";
import LmrCultivo from "../pages/Admin/Lmr";
import Consultorio from "../pages/Admin/Consultorio";
//Pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Productos from "../pages/Productos";
import Blog from "../pages/Blog";
//Other
import Error404 from "../pages/Error404";


const routes  = [
    {
        path: '/admin',
        component: LayoutAdmin,
        exact : false,
        routes: [
            {
                path: "/admin",
                component: AdminHome,
                exact : true 
            },
            {
                path: "/admin/login",
                component: AdminSingIn,
                exact:  true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact : true
            },
            {
                path: "/admin/menu",
                component: AdminMenuWeb,
                exact: true
            },
            {
                path: "/admin/cultivos",
                component: AdminCultivo,
                exact: true
            },
            {
                path: "/admin/plaguicidas",
                component: AdminPlaguicida,
                exact: true
            },
            {
                path: "/admin/problemas",
                component: AdminProblemas,
                exact: true
            },
            {
                path: "/admin/ingredientes",
                component: AdminIngredientes,
                exact: true
            },
            {
                path: "/admin/blog",
                component: AdminBlog,
                exact: true
            },
            {
                path: "/admin/lmr",
                component: LmrCultivo,
                exact: true
            },
            {
                path: "/admin/consultorio",
                component: Consultorio,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: '/',
        component: LayoutBasic,
        exact : false,
        routes: [
            {
                path: '/',
                component: Home,
                exact : true
            },
            {
                path: '/contact',
                component: Contact,
                exact : true
            },
            {
                path: "/productos",
                component: Productos,
                exact: true
            },
            {
                path: "/blog",
                component: Blog,
                exact: true
            },
            {
                path: "/blog/:url",
                component: Blog,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }
];

export default routes;

