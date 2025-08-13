import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer} from 'react-toastify';
export const currency = '$'


// export const backendUrl = import.meta.env.VITE_BACKEND_URL
// export const backendUrl ="https://e-commercer-website-4.onrender.com"
VITE_BACKEND_URL="http://localhost:4000"

const App = () => {
const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):"")

useEffect(()=>{
  localStorage.setItem("token",token)                         
},[token])

  return (
    <div className="bg-gray-50 min-h-screen">
          
          <ToastContainer/>

     {
      token === ""  ? <Login  setToken={setToken} />
      :
      <>
        <Navbar setToken={setToken} />
      <hr />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-[70%] mx-auto mmy-8 text-gray-600 text-base">
          <Routes>
            <Route path="/add" element={<Add  token={token}/>} />
            <Route path="/List" element={<List  token={token}/>} />
            <Route path="/orders" element={<Orders token={token} />} />
          </Routes>
        </div>
      </div>
      </>

     }
    </div>
  );
};

export default App;
