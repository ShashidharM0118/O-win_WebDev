import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Pages/Root/Root';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Sajek from './Components/TravelPlace/Sajek';
import Sreemangal from './Components/TravelPlace/Sreemangal';
import Sundarbans from './Components/TravelPlace/Sundarbans';
import HotelList from './Components/HotelList/HotelList';
import CurrTour from './Pages/CurrTour/CurrTour';
import CurrMap from './Pages/CurrMap/CurrMap';
import { AuthContext } from './Context/AuthContext';
import UserProfile from './Components/UserProfile/UserProfile';


function App(){
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/news',
        element: <Home></Home>
      },
      {
        path:'curr-tour',
        element: <CurrTour></CurrTour>
      },
      {
        path: '/destination',
        element: <Home></Home>
      },
      {
        path: '/blog',
        element: <Home></Home>
      },
      {
        path: '/curr-map',
        element: <CurrMap></CurrMap>
      },
      {
        path: '/contact',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/sajek',
        element: <Sajek></Sajek>
      },
      {
        path: '/sreemangal',
        element: <Sreemangal></Sreemangal>
      },
      {
        path: '/sundarbans',
        element: <Sundarbans></Sundarbans>
      },
      {
        path:'/test',
        element:<HotelList></HotelList>
      },
      {
        path:'/userprofile/:id',
        element:<UserProfile></UserProfile>

      }
    ]
  },
])

return (
  <AuthContext>
    <RouterProvider router={router}></RouterProvider>
  </AuthContext>
);
}
export default App;