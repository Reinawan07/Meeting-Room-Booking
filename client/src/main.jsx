import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, redirect, RouterProvider, } from "react-router-dom";
import App from './App';
import ClientPage from './pages/ClientPage';
import LoginPage from './pages/LoginPage';
import RoomPage from './pages/RoomPage';
import RoomUsagePage from './pages/RoomUsagePage';
import FormClient from './pages/FormClient';
import FormRoom from './pages/FormRoom';
import FormUsage from './pages/FormUsage';


const auth = () => {
  const access_token = localStorage.access_token;
  if (!access_token){
    throw redirect("/login");
  }
  return null;
}

const authLogin = () => {
  const access_token = localStorage.access_token;
  if (access_token){
    throw redirect("/client");
  }
  return null;
}

const home = () => {
    throw redirect("/client");
}


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: authLogin,
  },
  {
    element: <App />,
    children: [
      {
        path: "/",
        loader: home,
      },
      {
        path: "/client",
        element: <ClientPage />,
        loader: auth,
      },
      {
        path: "/add-client",
        element: <FormClient />,
        loader: auth,
      },
      {
        path: "/edit-client/:id",
        element: <FormClient />,
        loader: auth,
      },
      {
        path: "/room",
        element: <RoomPage />,
        loader: auth,
      },
      {
        path: "/add-room",
        element: <FormRoom />,
        loader: auth,
      },
      {
        path: "/edit-room/:id",
        element: <FormRoom />,
        loader: auth,
      },
      {
        path: "/usage",
        element: <RoomUsagePage />,
        loader: auth,
      },
      {
        path: "/add-usage",
        element: <FormUsage />,
        loader: auth,
      },
      {
        path: "/edit-usage/:id",
        element: <FormUsage />,
        loader: auth,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)