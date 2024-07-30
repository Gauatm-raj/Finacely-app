
import './App.css'

 import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
//import { createBrowserRouter,RouterProvider,Route,Link } from 'react-router-dom'
import DashBoard from "./pages/DashBoard"
import SignUp from './pages/SignUp'
import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';


function App() {

  // const router= createBrowserRouter([
  //   {
  //     path:"/",
  //     element:<SignUp/>
  //   },
  //   {
  //     path:"/dashboard",
  //     element:<DashBoard/>
  //   }
  // ]);
 

  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
       
      </Routes>
    </Router>
      </>
  //   <>
  //   <ToastContainer/>
  //   <RouterProvider router={router}/>
    
  //  </>
  )
}

export default App
