import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged in successfully!");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle Forgot Password
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userQuery = query(collection(db, "users"), where("email", "==", resetEmail));
            const querySnapshot = await getDocs(userQuery);

            if (querySnapshot.empty) {
                toast.error("Email not registered");
            } else {
                await sendPasswordResetEmail(auth, resetEmail);
                toast.success("Password reset email sent successfully");
                setShowForgotPassword(false);
            }
        } catch (error) {
            console.error("Error sending password reset email:", error);
            toast.error("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="text-white">
                <div className="hero" style={{ backgroundImage: 'url(https://i.ibb.co/1TprwH7/IMG-20231012-WA0017.jpg)', placeItems: 'normal' }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="px-5 lg:px-20">
                        <Navbar />
                        <div className="py-10">
                            <div className="flex justify-center my-12 lg:my-32 container mx-auto px-5">
                                <div className="border-2 rounded-xl w-full md:w-3/4 lg:w-2/4 py-8">
                                    <h2 className="text-3xl font-bold text-center pt-10 pb-5">
                                        <span className="text-yellow-500">Login</span> to your account
                                    </h2>

                                    {!showForgotPassword && (
                                        <form onSubmit={handleLogin} className="px-4 md:px-14">
                                            <input type="email" name="email" placeholder="Enter your email" className="p-3 mb-3 bg-transparent border-b-2 w-full" required />
                                            <input type="password" name="password" placeholder="Enter your password" className="p-3 mb-3 bg-transparent border-b-2 w-full" required />
                                            
                                            <div className="flex justify-between">
                                                <div className="flex gap-2">
                                                    <input className="checkbox checkbox-warning checkbox-xs md:checkbox-sm" type="checkbox" />
                                                    <p>Remember Me</p>
                                                </div>
                                                <a onClick={() => setShowForgotPassword(true)} className="text-yellow-500 cursor-pointer">Forgot password?</a>
                                            </div>

                                            <button className="btn bg-yellow-500 border-yellow-500 hover:bg-white hover:text-yellow-500 font-bold text-xl" disabled={loading}>
                                                {loading ? 'Logging In...' : 'Login'}
                                            </button>
                                        </form>
                                    )}

                                    {showForgotPassword && (
                                        <form onSubmit={handleForgotPassword} className="px-4 md:px-14">
                                            <h2 className="text-lg font-bold mb-4">Reset Password</h2>
                                            <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="Enter your email" className="p-3 mb-3 bg-transparent border-b-2 w-full" required />
                                            <button className="btn bg-yellow-500 border-yellow-500 hover:bg-white hover:text-yellow-500 font-bold text-xl" disabled={loading}>
                                                {loading ? 'Sending Email...' : 'Send Reset Email'}
                                            </button>
                                        </form>
                                    )}

                                    <div className="flex justify-center mb-4">
                                        <p className="text-xs md:text-lg mt-6">
                                            Don't have an account? <Link to='/signup' className="text-yellow-500 underline">Sign Up</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
