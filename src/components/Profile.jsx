import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Label } from './ui/label'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'

const isResume = true

const Profile = () => {
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div className='body_background max-h-[90rem] md:min-h-screen pb-10'>
            <Navbar />
            <div className='mx-[10%] card_background'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='heading_color text-xl'>{user?.fullname}</h1>
                            <p className='text-[#d0cdcd]'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <button onClick={() => setOpen(true)} className="text-right text_color"><Pen /></button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2 text-[#d0cdcd]'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2 text-[#d0cdcd]'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5 flex flex-col gap-2'>
                    <h1 className='heading_color'>Skills</h1>
                    <div className='flex items-center gap-1 '>
                        {
                            user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span className='text-[#d0cdcd]'>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full items-center gap-1.5'>
                    <Label className="text-md  heading_color">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text_color w-fit hover:underline'>{user?.profile?.resumeOriginalName}</a> : <span className='text-[#d0cdcd]'>NA</span>
                    }
                </div>
            </div>
            <div className='mx-[10%] card_background mt-5 py-4 rounded-2xl'>
                <h1 className='heading_color text-lg'>Applied Jobs</h1>
                <AppliedJobTable/>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile