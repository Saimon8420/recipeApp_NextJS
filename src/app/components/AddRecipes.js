"use client"
import { uid } from 'uid';
import React, { useEffect, useState } from 'react';
import { deleteIngredients, getIngredients } from '../api/ingredients';
import { addRecipes } from '../api/recipes';
import { useRouter } from 'next/navigation';

const AddRecipes = () => {
    const [ingredients, setIngredients] = useState([]);
    const router = useRouter();

    // to handle delete ingredients
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        router.refresh();
        async function fetchData() {
            const data = await getIngredients();
            setIngredients(data);
        };
        fetchData();
    }, [deleted])

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

    // console.log(ingredients?.id);

    useEffect(() => {
        if (remove.length !== 0) {
            setAddIngredients(addIngredients.filter(each => each.toLowerCase() !== remove.toLowerCase()))
            setSelect(select.filter(each => each.toLowerCase() !== remove.toLowerCase()))
        }
    }, [remove]);

    // handle Delete ingredients
    const handleDelete = async (id) => {
        const promptData = prompt(`Do you want to delete this? Then enter "YES" or "yes"`);
        if (promptData === "YES" || promptData === "yes") {
            setDeleted(false);
            const res = await deleteIngredients(id);
            setDeleted(true);
            alert("Data deleted successfully");
        }
        else {
            alert("Something went wrong!!");
        }
    }

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
                    <div className="flex flex-1 flex-col bg-white rounded-md shadow-sm mb-4">
                        <label htmlFor="select" className='text-white bg-indigo-600 w-full p-2'>Select ingredients from here</label>

                        <p className='px-4 py-2'>To select, click on the name. To edit click on the edit, and for delete click delete. And to add new ingredient, click Add New.</p>

                        <div style={{ height: "200px", overflowY: "scroll", margin: "10px 0px" }}>
                            {
                                ingredients.map(each => <div className='bg-indigo-400 flex justify-between rounded gap-5 p-1 mb-2 mt-2 ml-4 mr-4' key={each?.id}>
                                    {/* Each ingredients */}
                                    <p className='cursor-pointer hover:text-white' onClick={(e) => {
                                        if (e.target.innerText !== "Add New +") {
                                            setSelect([...select, e.target.innerText])
                                        }
                                    }}>{each?.label}</p>

                                    {/* Edit/delete ingredients */}

                                    <div className='flex gap-2'>
                                        <span className=' bg-white rounded px-1 cursor-pointer' onClick={() =>
                                            router.push(`/editIngredient/${each?.id}`)}>Edit</span>

                                        <span className='text-red-500 bg-white rounded px-1 cursor-pointer' onClick={() => handleDelete(each?.id)}>Delete</span>
                                    </div>

                                </div>)
                            }

                            {/* Add new ingredients */}
                            <p className='font-bold bg-red-400 ml-4 rounded mx-auto w-fit p-1 my-1 mt-4 text-white cursor-pointer' onClick={() => router.push("/addIngredient")}>Add New +</p>
                        </div>
                    </div>
                </div>

                {/* Added ingredients */}
                <div className='flex flex-col mb-4'>
                    <label htmlFor="select" className='text-white bg-indigo-600 w-full p-2 flex justify-between'>Selected Ingredients <span className='font-bold cursor-pointer' onClick={() => {
                        setAddIngredients([]);
                        setSelect([]);
                    }}>X</span></label>
                    <p className='p-1'>*Click each ingredient to remove individual</p>
                    <div className='bg-white rounded p-2 grid grid-cols-3 gap-2'>
                        {
                            addIngredients?.length === 0 && <p className='bg-red-400 rounded p-1'>Empty list! Select from the list</p>
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