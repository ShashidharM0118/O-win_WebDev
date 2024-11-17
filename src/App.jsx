import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from "./Pages/Root/Root"
// import Layout from "./Pages/Layout/Layout"
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
import Blogs from './Components/Blogs/Blogs';
import Booking from './Pages/Booking/Booking';
import Search from './Pages/Search/Search';

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
        path:'curr-tour',
        element: <CurrTour></CurrTour>
      },
      {
        path:'booking',
        element: <Booking></Booking>
      },
      {
        path: '/blog',
        element: <Home></Home>
      },
      {
        path: '/search',
        element: <Search></Search>
      },
      {
        path: '/curr-map',
        element: <CurrMap></CurrMap>
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

      },
      {
        path:'/blogs',
        element:<Blogs></Blogs>
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