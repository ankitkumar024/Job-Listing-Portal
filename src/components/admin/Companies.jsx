import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies()
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);
    return (
        <div className='body_background min-h-screen pb-20'>
            <Navbar />
            <div className='px-[10%] pb-8'>
                <div className='flex items-center justify-between py-4'>
                    <Input
                        className="w-fit lg:text-lg"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={() => navigate("/admin/companies/create")} className='button_primary text-sm lg:text-lg'>New Company</button>
                </div>

                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies