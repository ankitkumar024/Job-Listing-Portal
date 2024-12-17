import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { bulb, paperPlane } from '@/assets/index';

const HeroSection = () => {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='hero-section flex flex-col items-center py-4'>
            <div className='text-center flex flex-col gap-3 items-center lg:gap-5'>
                <span className='card_background w-fit p-1 px-2 text-[#4a90e2] text-[13px] font-medium lg:text-[15px]'>No. 1 Job Hunt Website</span>
                <div className='flex flex-col md:flex-row'>
                    <img className='relative w-[100px] left-[10%] md:bottom-5 lg:w-[200px]' src={bulb} alt="" />
                    <div className='flex flex-col gap-4 justify-center items-center'>
                        <h1 className='heading_color w-[70%] text-2xl md:text-3xl lg:text-5xl'>Your Journey to the <br /><span className='text-[#4a90e2]'> Perfect Job</span> Starts Here </h1>
                        <p className='text-[#d0cdcd] text-[13px] w-[70%] md:text-[15px] lg:text-[18px] '>Unlock your career potential with our job portal. Search, apply, and land your dream job quickly with tailored opportunities at your fingertips. Simplify your job hunt and let us connect you with the perfect match!</p>
                    </div>
                    <img className='relative w-[100px] left-[70%] md:left-[-5%] md:top-10 lg:w-[200px] ' src={paperPlane} alt="paperPlane" />
                </div>
                <div className="search w-[60%] flex shadow-[#08063754] shadow-lg border border-[#4a90e2] rounded-full items-center md:w-[50%]">
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none px-3 py-2 w-full rounded-l-full '
                    />
                    <button onClick={searchJobHandler} className='button_primary btn p-2 w-[20%] rounded-r-full flex justify-center md:w-[10%]'><Search className='w-3 lg:w-5' /></button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection