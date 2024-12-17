import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from './ui/avatar'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className='latestJobCards card_background card_styles w-full cursor-pointer'>
      

        <div className="card_styles">
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
        </div>
        <div className="card_styles">
          <h1 className='heading_color'>{job?.title}</h1>
          <p className='text-[#d0cdcd] text-sm'>{job?.description}</p>
        </div>
        <div className='flex items-center text-center gap-3 pt-2'>
          <Badge className={`text-[#fff] bg-[#c6564c]`} variant="ghost" >{job?.position} Positions</Badge>
          <Badge className={`text-[#fff] bg-[#6254d0]`} variant="ghost" >{job?.jobType}</Badge>
          <Badge className={`text-[#fff] bg-[#1b5b4e]`} variant="ghost" >{job?.salary}LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobCards