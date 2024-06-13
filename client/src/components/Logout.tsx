import React, { useEffect } from "react";

const Logout = () => {
  useEffect(()=>{
  const logout = async () => {
    await fetch("http://localhost:3000/logout", {
      method: "GET",
      credentials: "include",
    });
  };
  logout();
  }, [])
  return <div>You are successfully logged out.</div>;
};

export default Logout;
