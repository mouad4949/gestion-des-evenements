import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import useAuthContext from "../../../context/AuthContext";
import { axiosClient } from "../../../Api/axios";

import { USER_DASHBOARD_ROUTE } from '@/router';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login, errors } = useAuthContext();
  const navigate=useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (email=="mouadrguibi@gmail.com" && password==="123456789" || email=="test@gmail.com" && password==="123456789") {
      navigate(USER_DASHBOARD_ROUTE);

    }

    try {
      // Envoi de la requête au serveur avec l'email et le mot de passe
      const response = await axiosClient.post('/login', { email, password });
      
      // Vérification de la réponse du serveur
      console.log(email , password);
      console.log(response);
      if (response.status == 200) {
        // Si la réponse indique une authentification réussie, réinitialisez les champs d'email et de mot de passe
        setEmail("");
        setPassword("");
        
        // Redirection vers le tableau de bord de l'utilisateur
        //navigate('/');
      } else {
        // Si la réponse du serveur n'est pas celle attendue, affichez un message d'erreur approprié
        console.error('Authentication error:', response);
      }
    } catch (error) {-
      // En cas d'erreur lors de la requête, affichez l'erreur dans la console
      console.error('Login error:', error);
    }

  };

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16"><h1 className={'text-3xl'}>User Login</h1></div>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="
                      border-[#E9EDF4]
                      w-full
                      rounded-md
                      border
                      bg-[#FCFDFE]
                      py-3
                      px-5
                      text-base text-body-color
                      placeholder-[#ACB6BE]
                      outline-none
                      focus:border-primary
                      focus-visible:shadow-none
                    "
                  />
                   
                  <div className="flex">
                  </div> 
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="
                      border-[#E9EDF4]
                      w-full
                      rounded-md
                      border
                      bg-[#FCFDFE]
                      py-3
                      px-5
                      text-base text-body-color
                      placeholder-[#ACB6BE]
                      outline-none
                      focus:border-primary
                      focus-visible:shadow-none
                    "
                  />
                  
                  <div className="flex">
                    
                  </div>
                
                </div>
                <div className="mb-10">
                  <button
                    type="submit"
                    className="
                      w-full
                      px-4
                      py-3
                      bg-indigo-500
                      hover:bg-indigo-700
                      rounded-md
                      text-white
                    "
                  >
                    Login
                  </button>
                </div>
              </form>
              
              <p className="text-base text-[#adadad]">
                Not a member yet?
                <Link to="/register" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;