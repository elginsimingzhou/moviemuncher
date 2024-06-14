import React, { useEffect } from "react";
import { useAuth } from "../App";

const Logout = () => {
  const {setAuthenticated} = useAuth();
  useEffect(()=>{
  const logout = async () => {
    const response = await fetch("http://localhost:3000/logout", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok){
      setAuthenticated(false);
    }
  };
  logout();
  }, [])
  return <div>You are successfully logged out.</div>;
};

export default Logout;
