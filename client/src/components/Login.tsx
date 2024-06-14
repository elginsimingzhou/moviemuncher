import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { loginHandler } from "../api/loginHandler";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginHandler(email, password);
      if (response.ok) {
        navigate("/");
        setAuthenticated(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl my-6">Login</h1>

      <form
        className="flex flex-col w-80 my-6 "
        onSubmit={handleSubmit}
        action="/login"
        method="post"
      >
        <div className="flex flex-row justify-between mb-2">
          <label className=" font-bold mr-4" htmlFor="email">
            Email
          </label>
          <input
            className="text-black"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            type="text"
            id="email"
            name="email"
            required
            value={email}
          />
        </div>

        <div className="flex flex-row justify-between mb-6">
          <label className=" font-bold mr-4" htmlFor="password">
            Password
          </label>
          <input
            className="text-black"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            type="text"
            id="password"
            name="password"
            required
            value={password}
          />
        </div>

        <input
          className="rounded-xl bg-[#DC5F00] text-sm py-2 w-20"
          type="submit"
          value="Login"
        />
      </form>

      <a href="/register" className="text-sm">
        Not registed? Create an account
      </a>
    </div>
  );
};

export default Login;
