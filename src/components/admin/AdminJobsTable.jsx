import React, { useEffect, useState } from 'react'
import "../../Custom.css"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontalIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your recent posted jobs
                </TableCaption>
                <TableHeader>
                    <TableRow className="lg:text-xl">
                        <TableHead className="heading_color">Company Name</TableHead>
                        <TableHead className="heading_color">Role</TableHead>
                        <TableHead className="heading_color">Date</TableHead>
                        <TableHead className="text-right heading_color">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-[#d0cdcd] lg:text-lg">
                    {
                        filterJobs?.map((job) => (
                            <tr key={job?._id}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger className='text-[#4a90e2] hover:text-[#30649f]'>
                                            <MoreHorizontalIcon />
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col gap-2 w-40 card_background p-4">
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}`)} className='text-[#fff]  flex gap-3 w-fit items-center cursor-pointer'>
                                                <Edit2 className='w-5 ' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='text-[#fff] flex gap-3 w-fit items-center cursor-pointer'>
                                                <Eye className='w-5 ' />
                                                <span>Applicants</span>
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

export default AdminJobsTable