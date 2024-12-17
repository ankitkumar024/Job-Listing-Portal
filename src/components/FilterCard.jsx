import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Filter } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);
    return (
        <div>
            {/* For small to medium devices, show the Sheet */}
            <div className="block lg:hidden">
                <Sheet>
                    <SheetTrigger className='absolute top-[25%] right-[10%] md:top-[35%]'>
                        <button className=' text-[#fff] hover:text-[#9c9898] flex gap-1'><Filter className='w-5' /> Filter</button>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle className="heading_color">
                                Filter Jobs
                            </SheetTitle>
                            <hr className='mt-3' />
                            <SheetDescription>
                                <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                                    {
                                        fitlerData.map((data, index) => (
                                            <div className='text-start'>
                                                <h1 className='heading_color text-lg'>{data.fitlerType}</h1>
                                                {
                                                    data.array.map((item, idx) => {
                                                        const itemId = `id${index}-${idx}`
                                                        return (
                                                            <div className='flex items-center space-x-2 my-2'>
                                                                <RadioGroupItem className="border-[#fff] text-[#4a90e2]" value={item} id={itemId} />
                                                                <Label className="text-[#d0cdcd]" htmlFor={itemId}>{item}</Label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        ))
                                    }
                                </RadioGroup>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>


            {/* For large devices and above, show the filter card */}
            <div className='filter_card card_background hidden lg:block w-full p-3 rounded-md'>
                <h1 className='heading_color text-lg'>Filter Jobs</h1>
                <hr className='mt-3' />
                <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                    {
                        fitlerData.map((data, index) => (
                            <div>
                                <h1 className='heading_color text-lg'>{data.fitlerType}</h1>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        return (
                                            <div className='flex items-center space-x-2 my-2'>
                                                <RadioGroupItem className="border-[#fff] text-[#4a90e2]" value={item} id={itemId} />
                                                <Label className="text-[#d0cdcd]" htmlFor={itemId}>{item}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ))
                    }
                </RadioGroup>
            </div>
        </div>
    )
}

export default FilterCard