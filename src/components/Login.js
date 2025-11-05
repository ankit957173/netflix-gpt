import React, { useRef, useState } from 'react'
import Header from './Header'
import Button from './Button'
import { checkValidData } from '../utils/CheckValidation';
import {  signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL } from '../utils/constants';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = React.useState(true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const name=useRef("");
    const email=useRef("");
    const password=useRef("");

    const mapAuthError = (code, fallback = 'Something went wrong. Please try again.') => {
        switch (code) {
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/missing-email':
                return 'Email is required.';
            case 'auth/missing-password':
                return 'Password is required.';
            case 'auth/weak-password':
                return 'Use a stronger password (at least 6 characters).';
            case 'auth/email-already-in-use':
                return 'An account with this email already exists.';
            case 'auth/user-disabled':
                return 'This account has been disabled.';
            case 'auth/user-not-found':
                return 'No account found with this email.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            case 'auth/too-many-requests':
                return 'Too many attempts. Please try again later.';
            case 'auth/network-request-failed':
                return 'Network error. Check your connection and try again.';
            default:
                return fallback;
        }
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
        setError("");
        setLoading(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (loading) return;
        
        const error = checkValidData(email.current.value, password.current.value);
        // console.log(error)
        setError(error);
        if(error) return;
        
        setLoading(true);
        setError("");
        
        if (isSignInForm) {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log(user);
                updateProfile(user, { displayName: name.current.value }).then(() => {
                    // Profile updated!
                    const {uid,displayName,email}=auth.currentUser;
                    dispatch(addUser({ uid: uid, email: email, name: displayName }))
                }).catch(() => {
                    setLoading(false);
                });
            })
            .catch((error) => {
                const friendly = mapAuthError(error.code, "Account doesn't Exist. Please Sign Up.");
                setError(friendly);
                setLoading(false);
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
                    }).catch(() => {
                        setLoading(false);
                    });
                })
            .catch((error) => {
                const friendly = mapAuthError(error.code, 'Could not create your account. Please try again.');
                setError(friendly);
                setLoading(false);
            });
        }
    }

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{
            backgroundImage: `url(${BG_URL})`
        }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <Header />

            <form onSubmit={handleSubmit} className="relative z-10 w-11/12 sm:w-10/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-8 sm:p-10 md:p-12 mt-20 mx-auto bg-black bg-opacity-80 rounded-lg text-white shadow-2xl">
                <h1 className="font-bold my-4 text-2xl md:text-3xl">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

                {!isSignInForm && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        disabled={loading}
                        className="p-3 md:p-4 my-3 md:my-4 bg-gray-700 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                )}

                <input
                    ref={email}
                    type="email"
                    placeholder="Email Address"
                    disabled={loading}
                    className="p-3 md:p-4 my-3 md:my-4 bg-gray-700 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />

                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    disabled={loading}
                    className="p-3 md:p-4 my-3 md:my-4 bg-gray-700 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {error && <p className="text-red-500 text-base md:text-lg my-2">{error}</p>}

                <Button 
                    className="w-full my-4 md:my-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                    onClick={handleSubmit}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Please wait...</span>
                        </>
                    ) : (
                        isSignInForm ? "Sign In" : "Sign Up"
                    )}
                </Button>

                <p className="py-3 md:py-4 text-sm md:text-base cursor-pointer hover:text-gray-300 transition-colors" onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
                </p>
            </form>
        </div>
    )
}

export default Login
