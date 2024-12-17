import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })

    const { singleCompany } = useSelector(store => store.company);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoadingUpdate(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoadingUpdate(false);
        }
    }

    const deleteHandler = async () => {
        try {
            setLoadingDelete(true);
            const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${params.id}`, {

                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoadingDelete(false);
        }
    };


    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);

    return (
        <div className='body_background max-h-[90rem] md:min-h-screen'>
            <Navbar />
            <div className='px-[10%] pt-4'>
                <div className='flex items-center gap-[10%] md:gap-[25%]'>
                    <button onClick={() => navigate("/admin/companies")} className='flex gap-2 items-center text-[#fff] p-3 px-6 bg-transparent hover:bg-[#121219] border border-[#59596e] rounded-full lg:text-lg'>
                        <ArrowLeft />
                        <span>Back</span>
                    </button>
                    <h1 className='heading_color md:text-xl'>Company Setup</h1>
                </div>
                <form onSubmit={submitHandler} >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-6'>
                        <div className='flex flex-col gap-2'>
                            <Label className='heading_color lg:text-lg'>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='heading_color lg:text-lg'>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='heading_color lg:text-lg'>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='heading_color lg:text-lg'>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='heading_color lg:text-lg'>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>

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
                                    Update
                                </button>
                            )
                        }
                    </div>
                </form>

                <div className='flex relative pb-5 left-[52%] bottom-[3.71rem] w-[48%] '>
                    {
                        loadingDelete ? (
                            <button className='w-full pt-6 flex text-[#fff] justify-center items-center'>
                                <Loader2 className='flex  items-center mr-2 h-4 w-4 animate-spin text-[#fff]' />
                                Please Wait
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={deleteHandler}
                                className="w-full my-4 heading_color delete_btn"
                            >
                                Delete
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CompanySetup