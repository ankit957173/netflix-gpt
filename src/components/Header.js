import { signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { addUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
import { PROFILE_LOGO, LOGO, SUPPORTED_LANGUAGES } from '../utils/constants'
import { useState } from 'react'
import Button from './Button'
import { toggleGptSearch, setGptSearch } from '../utils/gptSlice'
import { setLanguage } from '../utils/configSlice'
const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [status, setStatus] = useState(true)
const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
    useEffect(() => {
      
      const unsubscribe=  onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties   
                // https://firebase.google.com/docs/reference/js/auth.user
                const {uid, email,displayName} = user;
                // console.log(user);
              dispatch(addUser({ uid: uid, email: email, name: displayName, }))
              // Only navigate to /browse if not already on a protected route
              if (location.pathname === '/') {
                navigate("/browse");
              }
            }
            else {
                // User is signed out
                // ...

              dispatch(removeUser());
              // Only navigate to login if not already there
              if (location.pathname !== '/') {
                navigate("/");
              }
            }
        });
      return () => {
        //cleanup action
        unsubscribe();
      };
    }, [location.pathname]);
  const handleSignOut=()=>{
signOut(auth).then(() => {

}).catch((error) => {
  console.log(error+ "in signout");
});
  }
  const HandleGptSearchClick=()=>{
    // If on DetailsPage, navigate to /browse first
    if (location.pathname.startsWith('/movie/')) {
      // Navigate to /browse and set the appropriate view
      // If button says "Home", we want to show Home (showGptSearch = false)
      // If button says "GPT Search", we want to show GPT Search (showGptSearch = true)
      const shouldShowGptSearch = !showGptSearch;
      // Set state first, then navigate
      dispatch(setGptSearch(shouldShowGptSearch));
      navigate('/browse');
    } else {
      // If already on /browse, just toggle the state
      dispatch(toggleGptSearch());
    }
  }
  const handleLanguageChange=(event)=>{
    dispatch(setLanguage(event.target.value));
  }
  const handleLogoClick = () => {
    // Always redirect to home page (/browse with Home view)
    // If not already on /browse, navigate there
    if (location.pathname !== '/browse') {
      navigate('/browse');
    }
    // Always ensure Home view is shown (not GPT Search)
    if (showGptSearch) {
      dispatch(setGptSearch(false));
    }
  }

  return (
    <header className='sticky top-0 z-30 flex justify-between items-center w-screen px-4 md:px-8  lg:px-24  bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40'>
      <img 
        className='w-28 md:w-44 drop-shadow cursor-pointer' 
        src={LOGO} 
        alt="Netflix Logo" 
        onClick={handleLogoClick}
      />
      {user && (
        <div className='flex items-center gap-2 md:gap-3'>
          {showGptSearch && (
            <select 
              name="languages" 
              id="languages" 
              onChange={handleLanguageChange}
              className='bg-black/60 text-white text-xs md:text-base px-2 py-1 md:px-3 md:py-2 rounded border border-white/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500'
            >
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>{language.name}</option>
              ))}
            </select>
          )}
          <Button className='bg-black/50 hover:bg-black/70 border border-white/10 text-white rounded-lg text-xs md:text-base sm:block transition-colors' onClick={HandleGptSearchClick} aria-label={showGptSearch ? 'Go to Home' : 'Open AI Search'} title={showGptSearch ? 'Home' : 'Ask AI'}>
            {showGptSearch ? "Home" : "Ask AI ✨"}
          </Button>
          <img className="w-8 h-8 md:w-12 md:h-12 rounded ring-1 ring-white/10" src={PROFILE_LOGO} alt="Profile" />
          <button
            onClick={handleSignOut}
            aria-label="Sign out"
            className='text-white/90 hover:text-white text-xs md:text-base px-2 py-1'
          > 
            Sign Out
          </button>
        </div>
      )}
    </header>
  )
}

export default Header