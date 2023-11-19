import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css?inline'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Customers from './components/CustomerList.jsx';
import Trainings from './components/TrainingList.jsx';
import Home from './components/Home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "trainings",
        element: <Trainings />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
