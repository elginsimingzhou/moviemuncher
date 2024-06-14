import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerHandler } from "../api/registerHandler";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await registerHandler(
      firstname,
      lastname,
      email,
      password
    );

    if (response.ok) {
      navigate("/login");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl my-6">Register</h1>

      <form
        className="flex flex-col w-80 my-6 "
        action="/register"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row justify-between mb-2">
          <label className=" font-bold mr-4" htmlFor="firstname">
            First Name
          </label>
          <input
            className="text-black"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFirstname(e.target.value);
            }}
            type="text"
            id="firstname"
            name="firstname"
            required
            value={firstname}
          />
        </div>

        <div className="flex flex-row justify-between mb-2">
          <label className=" font-bold mr-4" htmlFor="lastname">
            Last Name
          </label>
          <input
            className="text-black"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLastname(e.target.value);
            }}
            type="text"
            id="lastname"
            name="lastname"
            required
            value={lastname}
          />
        </div>

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
          value="Register"
        />
      </form>
    </div>
  );
};

export default Register;
