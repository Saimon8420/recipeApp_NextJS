"use client"
import React, { useEffect, useState } from 'react';
import { getAllRecipes } from '../api/recipes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const DisplayRecipe = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState("");

    useEffect(() => {
        router.refresh();
        async function getRecipes() {
            const data = await getAllRecipes();
            setData(data);
        }
        getRecipes();
    }, [])

    return (
        <div className='flex flex-col gap-8 mt-2 w-full'>
            <div className='flex items-center justify-center gap-4'>
                <input className="rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none" type="search" placeholder='Search recipe' name="" id="" onChange={(e) => setSearchData(e.target.value)} />
                <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => router.push("/addNewRecipes")}
                >
                    Add Recipe
                </button>
            </div>

            <div className='grid grid-cols-2 items-center p-2 gap-4'>
                {data.filter((each) =>
                    each.title.toLowerCase().includes(searchData.toLowerCase())
                ).map(each =>
                    <div key={each?.id} className='flex gap-2 rounded bg-white p-1 justify-between'>
                        <div className='shadow w-full rounded p-2 flex flex-col gap-3'>
                            <Link className='font-bold underline' href={`/details/${each.id}`}>{each.title}</Link>
                            <div className='flex gap-5'>
                                <button
                                    type="button"
                                    className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <Link href={`/editRecipe/${each?.id}`}>Edit</Link>
                                </button>
                                <button
                                    type="button"
                                    className="rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                >
                                    <Link href={"/addNewRecipes"}>Delete</Link>
                                </button>
                            </div>
                        </div>
                        <div className='flex'>
                            <img className='rounded' width={"100px"} src={each?.image} alt="" />
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default DisplayRecipe;