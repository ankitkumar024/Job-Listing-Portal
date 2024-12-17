import Navbar from '../shared/Navbar'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'

const companyArray = [];

const PostJob = () => {

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoadingUpdate(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoadingUpdate(false);
        }
    }

    return (
        <div className='body_background max-h-[90rem] md:min-h-screen pb-10'>
            <Navbar />
            <div className='px-[10%]'>
                <button onClick={() => navigate("/admin/jobs")} className='flex gap-2 items-center text-[#fff] p-3 px-6 bg-transparent hover:bg-[#121219] border border-[#59596e] rounded-full lg:text-lg'>
                    <ArrowLeft />
                    <span>Back</span>
                </button>
                <form onSubmit={submitHandler} className=' pt-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-6'>
                        <div className='flex flex-col gap-2'>
                            <Label className='heading_color lg:text-lg'>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='heading_color lg:text-lg'>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='heading_color lg:text-lg'>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='heading_color lg:text-lg'>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='heading_color lg:text-lg'>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='heading_color lg:text-lg'>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='heading_color lg:text-lg'>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='heading_color lg:text-lg'>No of Postion</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    <div className='w-[48%] lg:w-[50%]'>
                        {
                            loadingUpdate ? (
                                <button className='w-full lg:w-[100%] flex mt-4 text-[#fff] justify-center items-center'>
                                    <Loader2 className='flex items-center mr-2 h-4 w-4 animate-spin text-[#fff]' />
                                    Please Wait
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full lg:w-[100%] mt-4 heading_color button_primary "
                                >
                                    Post
                                </button>
                            )
                        }
                    </div>
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center py-3'>*Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob