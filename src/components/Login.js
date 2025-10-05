import React from 'react'
import Header from './Header'

const Login = () => {
    const [isSignInForm, setIsSignInForm] = React.useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{
            backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/d482944d-eab4-4a64-89c9-a07a508a6e42/web/IN-en-20250929-TRIFECTA-perspective_4cf0c8a1-bd35-4d72-a49f-165021531dde_large.jpg')`
        }}>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-0"></div>

            <Header />

            <form className="relative  w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-8 sm:p-10 md:p-12 my-15  mx-auto bg-black bg-opacity-80 rounded-lg text-white">
                <h1 className="font-bold my-4 text-3xl">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

                {!isSignInForm && (
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="p-4 my-4 bg-gray-700 w-full rounded-lg"
                    />
                )}

                <input
                    type="email"
                    placeholder="Email Address"
                    className="p-4 my-4 bg-gray-700 w-full rounded-lg"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="p-4 my-4 bg-gray-700 w-full rounded-lg"
                />

                <button className="p-4 my-6 bg-red-600 rounded-lg w-full">
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
