import React, { useEffect } from 'react'
import "./style.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth} from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, signOut } from "firebase/auth";
import userImg from "../../assets/userImg.svg"

const Header = () => {

  const navigate=useNavigate();

  const [user, loading] = useAuthState(auth);

  useEffect(()=>{
    if(user){
      navigate("/dashboard")
    }
  },[user,loading])

  const handleLogOut=()=>{
    try {
      signOut(auth).then(() => {
        toast.success("logged out")
        navigate("/")
        // Sign-out successful.
      }).catch((e) => {
        // An error happened.
        toast.error(e.message);
      });
    } catch (error) {
      toast.error(error.message);
    }
   
  }
  return (
    <div className='navbar'>
      <p className='logo'>Financely</p>
      {user && <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
  gap:"0.75rem"}}>
        <img style={{width:'2rem',height:"2rem",borderRadius:"50%"}} src={user.photoURL ? user.photoURL : userImg}/>
        <p className='logo menu' onClick={handleLogOut}>Logout</p>
        </div>  }
      
    </div>
  )
}

export default Header