import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState()
    const dispatch = useDispatch()

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error); 
        }
    }
    return (
        <div className='body_background max-h-[80rem] md:min-h-screen pb-3'>
            <Navbar />
            <div className='px-[10%] pt-4 pb-10 flex flex-col gap-3'>
                <div className="flex flex-col gap-3">
                    <h1 className='heading_color'>Your Company Name</h1>
                    <p className='text-[#d0cdcd]'>What would you like to give your company name? you can change this later.</p>
                </div>
                <Label className="heading_color pt-3">Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="CareerHunt, Microsoft etc."
                    onChange = {(e) => setCompanyName(e.target.value)}
                />

                <div className='flex items-center gap-2 my-10'>
                    <button onClick={() => navigate("/admin/companies")} className='button_primary'>Cancel</button>
                    <button onClick={registerNewCompany} className='button_primary bg-transparent hover:bg-[#4a90e2] border border-[#4a90e2]'>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate