import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'


const LatestJobs = () => {
    const {allJobs} = useSelector(store => store.job)
    return (
        <div className='latest_jobs px-[10%] py-4'>
            <div className='w-full flex flex-col gap-4 '>
                <h1 className='heading_color text-[#4a90e2] text-xl md:text-3xl lg:text-5xl'>Latest & Top <span className='heading_color'> Job Openings</span></h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:pt-3'>
                    {
                       allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards  key={job._id} job={job}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default LatestJobs