import {Link, Outlet} from "react-router-dom";
import '../../src/index.css'
import { USER_DASHBOARD_ROUTE } from "@/router";
import { useNavigate} from "react-router-dom";
import {useEffect} from "react";
  
export default function GuestLayout(){
  const navigate=useNavigate();
    

    useEffect(()=>{
        if(window.localStorage.getItem('ACCESS_TOKEN')){
        navigate(USER_DASHBOARD_ROUTE)
    }},);
    return <>
        <header>
        <div className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
      <div className="text-2xl text-white font-semibold inline-flex items-center">
        <img src="../../images/events.png" className="w-25 mr-4"/>
       
      </div>
      <div>
        <ul className="flex text-white">
          <li className="ml-5 px-2 py-1">
            <Link to={"/"}>Home page</Link>
          </li>
          <li className="ml-5 px-2 py-1">
            <Link to={"/Login"}>Login</Link>
          </li>
        </ul>
      </div>
    </div>
    </header>
        <main className={'container'}>
            <Outlet />
        </main>
        
    </>
}