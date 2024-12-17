import React, { useEffect, useState } from 'react'
import "../../Custom.css"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontalIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    return (
        <div className='py-10'>
            <Table>
                <TableCaption>
                    A list of your recent registered companies.
                </TableCaption>
                <TableHeader>
                    <TableRow className="lg:text-xl">
                        <TableHead className="heading_color">Logo</TableHead>
                        <TableHead className="heading_color">Name</TableHead>
                        <TableHead className="heading_color">Date</TableHead>
                        <TableHead className="text-right heading_color">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-[#d0cdcd] lg:text-lg">
                    {
                        filterCompany?.map((company) => (
                            <tr key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo} alt="company logo" />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger className='text-[#4a90e2] hover:text-[#30649f]'>
                                            <MoreHorizontalIcon />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 card_background">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='text-[#fff] flex gap-3 w-fit items-center'>
                                                <Edit2 className='w-5 cursor-pointer' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable