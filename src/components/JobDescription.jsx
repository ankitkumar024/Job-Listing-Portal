import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)

    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id || false);
    const [isApplied, setIsApplied] = useState(isInitiallyApplied)

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true)
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)

        }
    }
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id])
    return (
        <div className='body_background max-h-[90rem] md:min-h-screen px-[10%] py-10'>
            <div className='flex flex-col md:items-center md:flex-row md:justify-between'>
                <div>
                    <h1 className='heading_color text-xl lg:text-4xl'>{singleJob?.title}</h1>
                    <div className='flex md:items-start lg:flex-row lg:items-center items-center text-center gap-3 pt-6'>
                        <Badge className={`text-[#fff] bg-[#c6564c] text-[15px]`} variant="ghost" >{singleJob?.position} Positions</Badge>
                        <Badge className={`text-[#fff] bg-[#6254d0] text-[15px]`} variant="ghost" >{singleJob?.jobType}</Badge>
                        <Badge className={`text-[#fff] bg-[#1b5b4e] text-[15px]`} variant="ghost" >{singleJob?.salary}LPA</Badge>
                    </div>
                </div>

                <button
                    onClick={isApplied ? null : applyJobHandler}
                    className={`${isApplied ? "bg-teal-900 button_primary hover:bg-teal-900 w-[50%] md:w-[20%] mt-6 cursor-not-allowed" : "button_primary w-[40%] md:w-[20%] mt-6 lg:mt-[4rem]"}`}>
                    {isApplied ? "Already Applied" : "Apply Now"}
                </button>
            </div>

            <div className='pt-6 flex flex-col gap-2'>
                <h1 className='border-b-2 border-[#dfd6d65b] pb-2 heading_color text-xl lg:text-2xl'>Job Description</h1>
                <div className=''>
                    <h1 className='heading_color my-1 lg:text-xl'>Role: <span className='pl-4 text-[#d0cdcd] text-sm lg:text-[15px]'>{singleJob?.title}</span></h1>
                    <h1 className='heading_color my-1 lg:text-xl'>Location: <span className=' pl-4 text-[#d0cdcd] text-sm lg:text-[15px]'>{singleJob?.location}</span></h1>
                    <h1 className='heading_color my-1 lg:text-xl'>Description: <span className='pl-4 text-[#d0cdcd] text-sm lg:text-[15px]'>{singleJob?.description}</span></h1>
                    <h1 className='heading_color my-1 lg:text-xl'>Experience: <span className='pl-4 text-[#d0cdcd] text-sm lg:text-[15px]'>{singleJob?.experience} years</span></h1>
                    <h1 className='heading_color my-1 lg:text-xl'>Salary: <span className='pl-4 text-[#d0cdcd] text-sm lg:text-[15px]'>{singleJob?.salary}LPA</span></h1>
                    <h1 className='heading_color my-1 lg:text-xl'>Total Applicants: <span className='pl-4 text-[#d0cdcd] text-sm lg:text-[15px]'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='heading_color my-1 lg:text-xl'>Posted Date: <span className='pl-4 text-[#d0cdcd] text-sm lg:text-[15px]'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
                </div>
            </div>
        </div>
    )
}

export default JobDescription