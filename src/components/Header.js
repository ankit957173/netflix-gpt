import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeUser } from '../utils/userSlice'


const Header = () => {
  const user = useSelector((store) => store.user);
  console.log(user)  
  const navigate = useNavigate();
  
  const handleSignOut=()=>{
signOut(auth).then(() => {
  // Sign-out successful.
// dispatch(removeUser());
  navigate("/");
}).catch((error) => {
  // An error happened.
  console.log(error+ "in signout");
});
  }

  return (
    <div className='flex items-center justify-between relative pl-24 py-2 bg-gradient-to-b from-black z-10'>
      
        <img className='w-44' src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
      {user && (<div className=' p-2 m-2 flex'>
        <img className="w-12 h-12" src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp" alt="profile_icon" />
        <button className='font-bold text-white' onClick={handleSignOut}> Sign Out</button>
     
      </div>
      )}
      </div>)
}

export default Header