import { Link, Outlet, useNavigate } from "react-router-dom";
import '../../../src/index.css'
import { ACHATS, LOGIN_ROUTE, PANIER, USER_DASHBOARD_ROUTE } from "@/router";
import { useEffect, useState } from "react";
import { axiosClient } from "@/Api/axios";
import Home from "@/Pages/Home";
export default function UserDashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // initialiser à null pour vérifier plus tard
  const [loading, setLoading] = useState(true); // ajouter un état de chargement

  // useEffect(() => {
  //   const token = window.localStorage.getItem('ACCESS_TOKEN');
  //   if (!token) {
  //     navigate(LOGIN_ROUTE); // rediriger vers la page de connexion si non authentifié
  //     return;
  //   }

  //   axiosClient.get('/api/user')
  //     .then(response => {
  //       setUser(response.data); // s'assurer que les bonnes données sont définies
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user data:', error);
  //       navigate(LOGIN_ROUTE); // rediriger vers la page de connexion en cas d'erreur
  //     })
  //     .finally(() => {
  //       setLoading(false); // arrêter le chargement après la requête
  //     });
  // }, [navigate]);

  // if (loading) {
  //   return <div>Loading...</div>; // afficher un message de chargement pendant la requête
  // }

  return (
    <>
      <header>
        <div className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
          <div className="text-2xl text-white font-semibold inline-flex items-center">
            <img src="../../images/events.png" className="w-25 mr-4" />
          </div>
          <div>
            <ul className="flex text-white">
              <li className="ml-5 px-2 py-1">
                <Link to={USER_DASHBOARD_ROUTE}>Home page</Link>
              </li>
              <li className="ml-5 px-2 py-1">
                <Link to={PANIER}>Panier</Link>
              </li>
              <li className="ml-5 px-2 py-1">
                <Link to={ACHATS}>Achats</Link>
              </li>
              <li className="ml-5 px-2 py-1">
                <Link to={LOGIN_ROUTE}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      
        <Outlet />
      

    </>
  );
}
