"use client"
import { uid } from 'uid';
import React, { useEffect, useState } from 'react';
import { getIngredients } from '../api/ingredients';
import { addRecipes } from '../api/recipes';
import { useRouter } from 'next/navigation';

const AddRecipes = () => {
    const [ingredients, setIngredients] = useState([]);
    const router = useRouter();
    useEffect(() => {
        router.refresh();
        async function fetchData() {
            const data = await getIngredients();
            setIngredients(data);
        };
        fetchData();
    }, [])

    // for getting user inputs
    const [title, setTitle] = useState("");
    const [addIngredients, setAddIngredients] = useState([]);
    const [select, setSelect] = useState([]);
    const [instruction, setInstruction] = useState("");
    const [image, setImage] = useState("");

    // function to add New recipes
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.length !== 0 && addIngredients.length !== 0 && instruction.length !== 0 && image.length !== 0) {
            const data = { id: uid(), title, ingredients: addIngredients, instructions: instruction, image };
            const res = await addRecipes(data);
            if (res?.id && res?.title) {
                alert(`New Recipe added with name: ${res?.title}`);
                setTitle("");
                setAddIngredients([]);
                setSelect([]);
                setInstruction("");
                setImage("");
                router.push("/");
            }
            else {
                alert("Something went wrong!");
            }
        }
    }

    // for handle duplication ingredient select
    useEffect(() => {
        setAddIngredients(Array.from(new Set(select)));
    }, [select])

    // Remove from selected Ingredients
    const [remove, setRemove] = useState("");

    useEffect(() => {
        if (remove.length !== 0) {
            setAddIngredients(addIngredients.filter(each => each.toLowerCase() !== remove.toLowerCase()))
            setSelect(select.filter(each => each.toLowerCase() !== remove.toLowerCase()))
        }
    }, [remove])

    return (
        <div>
            <form className={`lg:w-2/3 m-auto md:w-full sm:w-full flex flex-col gap-4`} onSubmit={handleSubmit}>
                <div className='w-full lg:flex lg:gap-4 md:flex md:gap-4'>

                    {/* Add title */}
                    <div className='flex flex-1 flex-col lg:mb-0 md:mb-0 sm:mb-4'>
                        <label htmlFor="select" className='text-white bg-indigo-600 w-full p-2'>Add recipe title</label>
                        <input
                            type="text"
                            className="block w-full border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <br />

                    {/* Select ingredients */}
                    <div className="flex flex-1 flex-col items-center  bg-white rounded-md shadow-sm mb-4">
                        <label htmlFor="select" className='text-white bg-indigo-600 w-full p-2'>Select ingredients from here</label>
                        <select
                            required
                            className="h-full w-full border-0 bg-transparent py-2 pb-2 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md"
                            onClick={(e) => {
                                if (e.target.value !== "Add New +") {
                                    setSelect([...select, e.target.value])
                                }
                            }}
                            multiple={true}
                        >
                            {
                                ingredients.map(each => <option key={each?.id}>{each?.label}</option>)
                            }
                            <option className='font-bold' onClick={() => router.push("/addIngredient")}>Add New +</option>
                        </select>
                    </div>
                </div>

                {/* Added ingredients */}
                <div className='flex flex-col mb-4'>
                    <label htmlFor="select" className='text-white bg-indigo-600 w-full p-2 flex justify-between'>Selected Ingredients <span className='font-bold cursor-pointer' onClick={() => {
                        setAddIngredients([]);
                        setSelect([]);
                    }}>X</span></label>
                    <p className='p-1'>*Click each to remove individual</p>
                    <div className='bg-white rounded p-2 grid grid-cols-3 gap-2'>
                        {
                            addIngredients?.length === 0 && <p className='bg-red-400 rounded p-1'>Empty select from the list</p>
                        }
                        {
                            addIngredients.map(each =>
                                <p onClick={(e) => {
                                    setRemove(e.target.innerText)
                                }} key={each} className='flex items-center justify-between rounded px-1 py-2 shadow cursor-pointer'>{each}</p>
                            )
                        }
                    </div>
                </div>

                {/* Add Instruction */}
                <div className='flex flex-col mb-4'>
                    <label htmlFor="select" className='text-white bg-indigo-600 w-full p-2'>Add Instruction</label>
                    <textarea className='p-2' required placeholder='Enter instruction' style={{ height: "100px" }} value={instruction} onChange={(e) => setInstruction(e.target.value)} maxLength={1000}></textarea>
                </div>

                {/* Add Image url */}
                <div className='flex flex-col mb-4'>
                    <label htmlFor="select" className='text-white bg-indigo-600 w-full p-2'>Add image url</label>
                    <input
                        type="text"
                        name="price"
                        id="price"
                        className="block w-full border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Enter image url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>

                {/* Buttons */}
                <button
                    type='submit'
                    className="mt-4 mx-auto flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Submit
                </button>
            </form>

            <button
                className="mt-4 flex mx-auto items-center rounded-md bg-gray-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                onClick={() => router.push("/")}
            >
                Cancel
            </button>
        </div>
    );
};

export default AddRecipes;