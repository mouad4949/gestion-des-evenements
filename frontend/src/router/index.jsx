import { createBrowserRouter } from "react-router-dom";
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Register from '../Pages/Register';
import User from '../Pages/Users';
import NotFound from '../Pages/NotFound';
import Layout from '../Layouts/Layout';
import UserDashboardLayout from "@/Layouts/User/UserDashboardLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import UserDashboard from "@/components/ui/User/UserDashboard";
import Panier from "@/components/ui/User/Panier";
import Achats from "@/components/ui/User/Achats";

export const LOGIN_ROUTE = '/login';
export const USER_DASHBOARD_ROUTE = '/user/dashboard';
export const PANIER = '/user/panier';
export const ACHATS = '/user/Achats';
export const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      
      {
        path: '/users',
        element: <User />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ]},

    {
        element: <GuestLayout/>,
        children: [{
            path: LOGIN_ROUTE,
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />,
          },]
    },
    {
        element: <UserDashboardLayout/>,
        children: [{
            path: USER_DASHBOARD_ROUTE,
            element: <UserDashboard/>,  // Vous pouvez remplacer cela par votre composant de tableau de bord utilisateur
          },
          {
            path: PANIER,
            element: <Panier/>,
          },
          {
            path: ACHATS,
            element: <Achats/>,
          }
        ]
    },
  
]);
