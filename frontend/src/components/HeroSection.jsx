import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-3 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <motion.h1
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-center tracking-tight user-select text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    Find Your Dream Job With CareerHub
                    {/* <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text user-select">

    </span> */}
                </motion.h1>
                <p className='text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed text-center'>Connect with leading companies and explore opportunities that align with your talents and goals. Your dream career begins at CareerHub.</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Search by job Title or skills'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection