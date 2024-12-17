import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div>
            <Table>
                <TableCaption className="text-[#d0cdcd] lg:text-xl">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-[#fff]">Date</TableHead>
                        <TableHead className="text-[#fff]">Job Role</TableHead>
                        <TableHead className="text-[#fff]">Company</TableHead>
                        <TableHead className="text-right text-[#fff]">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                         allAppliedJobs.length <= 0 ? <span className='text-[#d0cdcd] lg:text-xl'>You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell className="text-[#fff]">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-[#fff]">{appliedJob.job?.title}</TableCell>
                                <TableCell className="text-[#fff]">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right text-[#fff]"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable