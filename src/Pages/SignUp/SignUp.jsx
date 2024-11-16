import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
// import {Navbar} from "../../Components/Navbar/Navbar";
import { auth, db, storage } from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, deleteUser } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAvatar } from '@dicebear/avatars';
import * as initials from '@dicebear/avatars-initials-sprites';
import { v4 as uuidv4 } from 'uuid';

const SignUp = () => {
    const [name, setName] = useState('');
    const [credits,setcredits]=useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phNO, setphNo] = useState('');
    const [loading, setLoading] = useState(false);
    const [waitingForVerification, setWaitingForVerification] = useState(false);
    const [createdUser, setCreatedUser] = useState(null);
    const navigate = useNavigate();
    
    const colors = ['#ffcc00', '#00aeff', '#ff5733', '#4caf50'];
    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    async function handleSignUp(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setCreatedUser(user);

            await updateProfile(user, { displayName: name, phoneNumber: phNO });
            await sendEmailVerification(user);

            toast.info('Verification email sent. Please verify your email to complete signup');
            setWaitingForVerification(true);
            setLoading(false);

            const checkEmailVerified = setInterval(async () => {
                await user.reload();
                if (user.emailVerified) {
                    clearInterval(checkEmailVerified);
                    const avatarSvg = createAvatar(initials, {
                        seed: user.email.charAt(0).toUpperCase(),
                        backgroundColor: getRandomColor(),
                        textColor: '#888888',
                        size: 100
                    });
                    const svgBlob = new Blob([avatarSvg], { type: 'image/svg+xml' });
                    const reader = new FileReader();
                    reader.readAsDataURL(svgBlob);
                    reader.onloadend = async () => {
                        const base64data = reader.result;
                        const storageRef = ref(storage, `userImages/${user.email}.svg`);
                        await uploadString(storageRef, base64data, 'data_url');
                        const imageUrl = await getDownloadURL(storageRef);

                        await addDoc(collection(db, 'users'), {
                            _id: uuidv4(),
                            email: user.email,
                            displayName: user.displayName,
                            photoURL: imageUrl,
                            phNO: phNO,
                            credits:0
                        });

                        navigate('/');
                    };
                }
            }, 3000);

        } catch (error) {
            console.error(error);
            toast.error(error.message);
            setLoading(false);
            if (createdUser) {
                await deleteUser(createdUser);
                toast.warn('User account deleted due to signup error.');
            }
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className="text-white">
                <div className="hero" style={{ backgroundImage: 'url(https://i.ibb.co/1TprwH7/IMG-20231012-WA0017.jpg)', placeItems: 'normal' }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="px-5 lg:px-20">
                        {/* <Navbar /> */}
                        <div className='py-10'>
                            <div className="flex justify-center my-12 lg:my-32 container mx-auto px-5">
                                <div className="border-2 rounded-xl w-full md:w-3/4 lg:w-2/4 py-8">
                                    <h2 className="text-3xl font-bold text-center pt-10 pb-5">
                                        <span className='text-yellow-500'>Sign Up</span> your account
                                    </h2>
                                    <form onSubmit={handleSignUp} className="px-4 md:px-14">
                                        <input type="text" placeholder="Enter your name" className="p-3 mb-3 border-b-2 w-full bg-transparent" required onChange={(e) => setName(e.target.value)} />
                                        <input type="email" placeholder="Enter your email" className="p-3 mb-3 border-b-2 w-full bg-transparent" required onChange={(e) => setEmail(e.target.value)} />
                                        <input type="password" placeholder="Enter your Password" className="p-3 mb-3 border-b-2 w-full bg-transparent" required onChange={(e) => setPassword(e.target.value)} />
                                        <input type="password" placeholder="Confirm Password" className="p-3 mb-3 border-b-2 w-full bg-transparent" required onChange={(e) => setConfirmPassword(e.target.value)} />
                                        <input type="number" placeholder="Your Phone number" className="p-3 mb-3 border-b-2 w-full bg-transparent" required onChange={(e) => setphNo(e.target.value)} />
                                        <div className="flex gap-3 mt-5">
                                            <input type="checkbox" className='checkbox checkbox-warning checkbox-xs md:checkbox-sm' required />
                                            <label className="text-xs md:text-lg">Accept our terms and conditions</label>
                                        </div>
                                        <div className="form-control mt-6">
                                            <button type="submit" className="btn bg-yellow-500 border-yellow-500 hover:bg-white hover:text-yellow-500 font-bold text-xl" disabled={loading || waitingForVerification}>
                                                {loading ? 'Creating Account...' : (waitingForVerification ? 'Waiting for Verification...' : 'Sign Up')}
                                            </button>
                                        </div>
                                    </form>
                                    <div className="flex justify-center mb-4">
                                        <h2 className="text-xs md:text-lg mt-6 mb-6">
                                            Already have an account? <Link to='/login' className="text-yellow-500 underline">Login</Link>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </div>
    );
};

export default SignUp;
