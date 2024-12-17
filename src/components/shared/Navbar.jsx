import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.message) {
                dispatch(setUser(null))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <nav>
            <div className='flex flex-row p-8 px-[10%] justify-between items-center text-center'>
                <div>
                    <h1 className='heading_color md:pt-5 text-[18px] md:text-2xl lg:text-3xl'>Career<span className='text-[#4a90e2]'>Hunt</span></h1>
                </div>

                <div className="relative">
                    <Sheet>
                        <SheetTrigger >
                            <button className="md:hidden button_primary">☰</button> {/* Button to open the sheet */}
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle className="text-[#dcdada]">Menu</SheetTitle>
                                <SheetDescription></SheetDescription>
                            </SheetHeader>

                            {/* Sheet Menu */}
                            <ul className='flex flex-col gap-3'>
                                {user && user.role === 'recruiter' ? (
                                    <>
                                        <li className='text_color cursor-pointer'><Link to="/">Home</Link></li>
                                        <li className='text_color cursor-pointer'><Link to="/admin/companies">Companies</Link></li>
                                        <li className='text_color cursor-pointer'><Link to="/admin/jobs">Jobs</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li className='text_color cursor-pointer'><Link to="/">Home</Link></li>
                                        <li className='text_color cursor-pointer'><Link to="/jobs">Jobs</Link></li>
                                        <li className='text_color cursor-pointer'><Link to="/browse">Browse</Link></li>
                                    </>
                                )}
                            </ul>

                            {/* Authentication buttons */}
                            {!user ? (
                                <div className='flex flex-col gap-3 mt-6'>
                                    <Link to="/login"><button className='button_primary w-full'>Log In</button></Link>
                                    <Link to="/signup"><button className='button_primary bg-transparent hover:bg-[#4a90e2] border border-[#4a90e2] w-full'>Sign Up</button></Link>
                                    

                                </div>
                            ) : (
                                <div className='flex flex-col mt-6 gap-4'>
                                    {user?.role === 'student' && (
                                        <div className='flex w-fit items-center text_color gap-2 cursor-pointer'>
                                            <User2 />
                                            <button className='hover:underline'><Link to="/profile">View Profile</Link></button>
                                        </div>
                                    )}
                                    <div className='flex w-fit items-center text_color gap-2 cursor-pointer'>
                                        <LogOut />
                                        <button onClick={logoutHandler} className='hover:underline'>Logout</button>
                                    </div>
                                </div>
                            )}
                        </SheetContent>
                    </Sheet>

                    {/* Original content for medium and larger screens */}
                    <div className="hidden gap-4 md:flex md:flex-row md:w-max md:items-center" >
                        <ul className='flex flex-col gap-3 md:flex-row md:items-center md:text-lg lg:text-xl lg:gap-5'>
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <li className='text_color cursor-pointer'><Link to="/">Home</Link></li>
                                    <li className='text_color cursor-pointer'><Link to="/admin/companies">Companies</Link></li>
                                    <li className='text_color cursor-pointer'><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='text_color cursor-pointer'><Link to="/">Home</Link></li>
                                    <li className='text_color cursor-pointer'><Link to="/jobs">Jobs</Link></li>
                                    <li className='text_color cursor-pointer'><Link to="/browse">Browse</Link></li>
                                </>
                            )}
                        </ul>

                        {/* User authentication section */}
                        {!user ? (
                            <div className='flex flex-col gap-3 md:flex-row'>
                                <Link to="/login"><button className='button_primary'>Log In</button></Link>
                                <Link to="/signup"><button className='button_primary bg-transparent hover:bg-[#4a90e2] border border-[#4a90e2]'>Sign Up</button></Link>
                                
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar>
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 card_background relative top-3 right-[5rem]">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2 items-center'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage className="text-[#fff]" src={user?.profile?.profilePhoto} alt="Profile Photo" />
                                            </Avatar>
                                            <div>
                                                <h4 className='heading_color'>{user?.fullname}</h4>
                                                <p className='text-sm text-[#d0cdcd]'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 gap-2'>
                                            {user?.role === 'student' && (
                                                <div className='flex w-fit items-center text_color gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <button className='hover:underline'><Link to="/profile">View Profile</Link></button>
                                                </div>
                                            )}
                                            <div className='flex w-fit items-center text_color gap-2 cursor-pointer'>
                                                <LogOut />
                                                <button onClick={logoutHandler} className='hover:underline'>Logout</button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar