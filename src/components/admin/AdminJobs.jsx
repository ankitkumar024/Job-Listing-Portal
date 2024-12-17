import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs()
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);
    return (
        <div className='body_background max-h-[90rem] md:min-h-screen pb-20'>
            <Navbar />
            <div className='px-[10%] pb-8'>
                <div className='flex items-center justify-between py-4'>
                    <Input
                        className="w-fit lg:text-lg"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={() => navigate("/admin/jobs/create")} className='button_primary text-sm lg:text-lg'>New Jobs</button>
                </div>

                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs