import React, { useEffect } from "react";
import { useAuth } from "../App";
import { logoutHandler } from "../api/logoutHandler";

const Logout = () => {
  const {setAuthenticated} = useAuth();
  useEffect(()=>{
  const logout = async () => {
    const response = await logoutHandler();
    if (response.ok){
      setAuthenticated(false);
    }
  };
  logout();
  }, [])
  return <div>You are successfully logged out.</div>;
};

export default Logout;
