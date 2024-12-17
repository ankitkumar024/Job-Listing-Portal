import { Bookmark } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date()
        const timeDifference = currentTime - createdAt
        return Math.floor(timeDifference / (1000*24*60*60))
    }

    return (
        <div className='card_background card_styles w-full lg:w-[18rem] cursor-pointer'>
            <div className='flex items-center justify-between'>
                <p className='text-[#d0cdcd] text-sm'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <button variant="outline" className='rounded-full text_color' size="icon"><Bookmark /></button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <button>
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </button>
                <div>
                    <h1 className='heading_color'>{job?.company?.name}</h1>
                    <p className='text-[#d0cdcd] text-sm'>{job?.location}</p>
                </div>
            </div>
            <div>
                <h1 className='heading_color'>{job?.title}</h1>
                <p className='text-[#d0cdcd] text-sm'>{job?.description}</p>
            </div>
            <div className='flex md:items-start lg:flex-row lg:items-center items-center text-center gap-3 pt-2'>
                <Badge className={`text-[#fff] bg-[#c6564c]`} variant="ghost" >{job?.position} Positions</Badge>
                <Badge className={`text-[#fff] bg-[#6254d0]`} variant="ghost" >{job?.jobType}</Badge>
                <Badge className={`text-[#fff] bg-[#1b5b4e]`} variant="ghost" >{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-start gap-2 pt-2 lg:flex-row'>
                <button onClick={() => navigate(`/description/${job?._id}`)} className='button_primary bg-transparent hover:bg-[#4a90e2] border border-[#4a90e2]'>Details</button>
                <button className='button_primary'>Save For Later</button>
            </div>
        </div>
    )
}

export default Job