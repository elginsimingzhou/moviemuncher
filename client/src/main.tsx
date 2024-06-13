import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import Login from "./components/Login.tsx";
import Watchlist from "./components/Watchlist.tsx";
import Home from "./components/Home";
import Register from "./components/Register.tsx";
import MoviePage from "./components/MoviePage.tsx";
import Logout from "./components/Logout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/watchlist",
        element: <Watchlist />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/search/:imdbID",
        element: <MoviePage />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
