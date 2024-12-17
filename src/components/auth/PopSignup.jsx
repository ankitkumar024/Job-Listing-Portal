import React, { useState, useEffect } from 'react';
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Link, useNavigate, } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import Popup from '../Popup';

const PopSignup = () => {

    const [showSignup, setShowSignup] = useState(false);

    // Automatically open the signup modal when the page loads
    useEffect(() => {
        // Check if the user has already signed up (by checking localStorage)
        const userSignedUp = localStorage.getItem('userSignedUp');
        if (!userSignedUp) {
            // If not signed up, show the popup
            setShowSignup(true);
        }
    }, []);

    const closePopup = () => {
        // Mark the user as signed up in localStorage
        localStorage.setItem('userSignedUp', true);
        // Hide the popup
        setShowSignup(false);
    };

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })

    const { loading } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            dispatch(setLoading(true))

            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/login")
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div >
            {showSignup && (
                <Popup onClose={closePopup}>
                    <form onSubmit={submitHandler} className=' flex flex-col card_background items-center justify-center rounded-md p-4 mt-[90%] md:mt-[30%] md:w-[50%] md:mx-[25%] lg:mt-[2%] lg:w-[35%] lg:mx-[30%]'>
                        <h1 className='heading_color text-center text-xl mb-5 md:text-2xl'>Sign Up</h1>
                        <div className='my-2 w-full flex flex-col gap-2'>
                            <Label className="heading_color md:text-[14px]">Full Name</Label>
                            <Input
                                type="text"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeEventHandler}
                                placeholder="John Doe"
                            />
                        </div>
                        <div className='my-2 w-full flex flex-col gap-2 '>
                            <Label className="heading_color md:text-[14px]">Email</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="johndoe@gmail.com"
                            />
                        </div>
                        <div className='my-2 w-full flex flex-col gap-2'>
                            <Label className="heading_color md:text-[14px]">Phone Number</Label>
                            <Input
                                id="phone"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                name="phoneNumber"
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div className='my-2 w-full flex flex-col gap-2'>
                            <Label className="heading_color md:text-[14px]">Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="Password"
                            />
                        </div>
                        <div className='my-2 w-full flex flex-col gap-2 '>
                            <RadioGroup className="flex items-center gap-4 my-5">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === "student"}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer w-full"
                                    />
                                    <Label className="heading_color" htmlFor="r1">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === "recruiter"}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label className="heading_color" htmlFor="r2">Recruiter</Label>
                                </div>
                            </RadioGroup>
                            <div className='flex items-center gap-2 '>
                                <Label className="heading_color">Profile</Label>
                                <Input
                                    accept="image/*"
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>

                        {
                            loading ? <button><Loader2 className='flex justify-center items-center mr-2 h-4 w-full animate-spin text-[#fff]' />Please Wait</button> : <button type="submit" className="w-full my-4 heading_color button_primary">Sign Up</button>
                        }

                        <span className='text-sm text-[#d0cdcd]'>Already have an account? <Link to="/login" className='text-blue-600'>Log In</Link></span>
                    </form>
                </Popup>
            )}

        </div>
    )
}

export default PopSignup