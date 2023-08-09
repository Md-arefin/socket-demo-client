import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SocketProvide from './Provider/SocketProvide.jsx';
import Room from './Pages/Room/Room.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/room/:id",
    element: <Room/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvide>
      <RouterProvider router={router} />
    </SocketProvide>
  </React.StrictMode>,
)
