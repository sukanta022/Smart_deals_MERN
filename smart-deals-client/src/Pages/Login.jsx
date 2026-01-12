import React, {  use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import ForgotPasswordModal from '../Component/ForgetPasswordModal';

const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
     
    const [email, setEmail] = useState("");
    const [openForgot, setOpenForgot] = useState(false);
    
    const {signInUser,signInGoogle} = use(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const handlePasswordFeild = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }
    
    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email,password)

        setError('')
        setSuccess(false)
        signInUser(email,password)
        .then(() =>{
            setSuccess(true)
            toast.success("Login successfully")
            navigate(`${location.state ? location.state : "/"}`)
        } )
        .catch(error => setError(error.message))

    }

    const handleGoogleSignIn = () => {
        setError('')
        setSuccess(false)
        signInGoogle()
        .then((result) => {
            const newUser = {
                name : result.user.displayName,
                email : result.user.email,
                image : result.user.photoURL
            }

            fetch('http://localhost:3000/users', {
                method: "POST",
                headers: {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then((data) => {
                console.log("Data after save", data)
            })

            toast.success("Sign in successfully")
            setSuccess(true)
            navigate(`${location.state ? location.state : "/"}`)
        })
        .catch((error) => {
            console.log(error)
            setError(error.message)
        })
    }


    return (
         <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col space-y-3 animate__animated animate__fadeIn">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-[#4e34de]">Login now!</h1>
                
                </div>
                <div className="card bg-base-100 w-80 md:w-100  shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email"  className="input w-full" placeholder="Email" />
                                <label className="label">Password</label>
                                <div className='relative'>
                                    <input type={showPassword ? "text" : "password"} name="password" className="input w-full" placeholder="Password" />
                                    <button onClick={handlePasswordFeild} className='text-2xl absolute top-2 right-2'>
                                        {
                                            showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                                        }
                                    </button>
                                </div>
                                <div ><a onClick={() => setOpenForgot(true)} className="link link-hover">Forgot password?</a></div>
                                <button style={{ background: "linear-gradient(135deg, #4e34de 0%, #b46ff4 100%)" }} className="btn text-white mt-4 w-full">Login</button>
                                
                            </fieldset>
                        </form>
                        <button onClick={handleGoogleSignIn} className='btn font-semibold text-white bg-[#001931]'><FcGoogle /> Sign in with Google</button>
                        <p>New to our website? Please <Link to={'/register'} className='text-blue-500 underline'>Register</Link></p>
                    </div>
                    {
                        error && <p className='text-red-500 text-center font-semibold'>{error}</p> 
                    }
                    {
                        success &&  <p className='text-green-500 text-center'>Logged in successfully</p>
                    }
                    
                </div>
            </div>
            <ForgotPasswordModal
        open={openForgot}
        onClose={() => setOpenForgot(false)}
        defaultEmail={email}
      />
        </div>
    );
};

export default Login;