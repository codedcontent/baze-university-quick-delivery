import React, { useState } from "react";
import MyButton from "./components/MyButton";
import UserIsAuthenticated from "./UserIsAuthenticated";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [password, setPassword] = useState("");

  const UserNotAuthenticated = () => {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <form
          className="md:w-1/2 w-4/5 border-2 border-secondary p-5 rounded-md space-y-6"
          onSubmit={(e) => {
            e.preventDefault();

            handleLogin();
          }}
        >
          <p className="text-xl font-semibold">
            You are not authenticated, provide your password
          </p>

          <input
            type="password"
            name="admin-password"
            id="adminPassword"
            placeholder="What is the password?"
            className="border-2 rounded-md outline-none px-4 w-full h-14"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoFocus
          />

          <MyButton title={"Login"} buttonAction={handleLogin} type="submit" />
        </form>
      </div>
    );
  };

  const handleLogin = () => {
    const authPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (authPassword === password) {
      setIsAuthenticated(true);
    } else {
      alert("You shall not pass!");
    }
  };

  return (
    <div className="w-screen h-screen bg-white">
      {isAuthenticated ? <UserIsAuthenticated /> : <UserNotAuthenticated />}
    </div>
  );
};

export default Admin;
