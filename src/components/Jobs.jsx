import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs)

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery])

    return (
        <div className='body_background min-h-screen pb-10'>
            <Navbar />
            <div className='px-[8%] pt-[4rem]'>
                <div className="flex">
                    <div className='w-0 lg:w-[20%] '>
                        <FilterCard/>
                    </div>
                    {
                        filterJobs.length <= 0 ? <span className="text-[#fff] pl-4">Job not found</span> : (
                            <div className='flex-1 h-[80vh] md:h-[90vh] lg:h-[100vh] overflow-y-auto px-2 pb-5'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <div
                                                key={job?._id}>
                                                <Job job={job} />
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Jobs