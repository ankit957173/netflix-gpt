import { signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { addUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import { PROFILE_LOGO, LOGO, SUPPORTED_LANGUAGES } from '../utils/constants'
import { useState } from 'react'
import Button from './Button'
import { toggleGptSearch } from '../utils/gptSlice'
import { setLanguage } from '../utils/configSlice'
const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [status, setStatus] = useState(true)
const dispatch = useDispatch();
  const navigate = useNavigate();
    useEffect(() => {
      
      const unsubscribe=  onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties   
                // https://firebase.google.com/docs/reference/js/auth.user
                const {uid, email,displayName} = user;
                // console.log(user);
              dispatch(addUser({ uid: uid, email: email, name: displayName, }))
              navigate("/browse");
            }
            else {
                // User is signed out
                // ...

              dispatch(removeUser());
              navigate("/");
            }
        });
      return () => {
        //cleanup action
        unsubscribe();
      };
    }, []);
  const handleSignOut=()=>{
signOut(auth).then(() => {

}).catch((error) => {
  console.log(error+ "in signout");
});
  }
  const HandleGptSearchClick=()=>{
    console.log("GPT Search Clicked");
    dispatch(toggleGptSearch());
  }
  const handleLanguageChange=(event)=>{
    dispatch(setLanguage(event.target.value));
  }
  return (
    <header className='flex justify-between items-center absolute w-full px-6 md:px-24 py-2 bg-gradient-to-b from-black z-10'>
      <img className='w-32 md:w-44' src={LOGO} alt="Netflix Logo" />
      {user && (
        <div className='flex items-center gap-3'>
          {showGptSearch && <select name="" id="languages" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((language) => (
              <option key={language.identifier} value={language.identifier}>{language.name}</option>
            ))}
          </select>}
          <Button className='bg-black text-white rounded-lg' onClick={HandleGptSearchClick}>{showGptSearch ? "Home" : "GPT Search"}</Button>
          <img className="w-10 h-10 md:w-12 md:h-12 rounded" src={PROFILE_LOGO} alt="Profile" />
          <Button 
            variant="ghost"
            onClick={handleSignOut}
            aria-label="Sign out"
          > 
            Sign Out
          </Button>
        </div>
      )}
    </header>
  )
}

export default Header