import React, { useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/CheckValidation';
import {  signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = React.useState(true);
    const [error, setError] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name=useRef("");
    const email=useRef("");
    const password=useRef("");

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    const handleButtonClick = (e) => {
        const error = checkValidData(email.current.value, password.current.value);
        console.log(error)
        setError(error);
        if(error) return;
        if(isSignInForm){
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log(user);
 updateProfile(user, { displayName: name.current.value }).then(() => {
                        // Profile updated!
                        const {uid,displayName,email}=auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, name: displayName }))
                        navigate("/browse");
                
                    })
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError("Invalid Credentials");
            });
        } else {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // console.log(user);
                    updateProfile(user, { displayName: name.current.value }).then(() => {
                        // Profile updated!
                        const {uid,displayName,email}=auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, name: displayName }))
                        navigate("/browse");
                
                    })
                })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
                // ..
            });
        }
    }

    return (
        <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{
            backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/d482944d-eab4-4a64-89c9-a07a508a6e42/web/IN-en-20250929-TRIFECTA-perspective_4cf0c8a1-bd35-4d72-a49f-165021531dde_large.jpg')`
        }}>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 z-0"></div>

            <Header />

            <form onSubmit={(e)=>e.preventDefault()} className="relative  w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-8 sm:p-10 md:p-12 my-15  mx-auto bg-black bg-opacity-80 rounded-lg text-white">
                <h1 className="font-bold my-4 text-3xl">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

                {!isSignInForm && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        className="p-4 my-4 bg-gray-700 w-full rounded-lg"
                    />
                )}

                <input
                    ref={email}
                    type="email"
                    placeholder="Email Address"
                    className="p-4 my-4 bg-gray-700 w-full rounded-lg"
                />

                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-4 my-4 bg-gray-700 w-full rounded-lg"
                />
                {error && <p className="text-red-500 text-lg text-wrap">{error}</p>}

                <button className="p-4 my-6 bg-red-600 rounded-lg w-full" onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
                </p>
            </form>
        </div>
    )
}

export default Login
