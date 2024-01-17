"use client"
import React, { useState } from 'react';
import { addNewIngredients } from '../api/ingredients';
import { useRouter } from 'next/navigation';
import { uid } from 'uid';

const AddIngredient = () => {
    const router = useRouter();
    // to receive new ingredients user input
    const [newIngredients, setNewIngredients] = useState("");

    const handleNewIngredients = async () => {
        if (newIngredients?.length !== 0) {
            const id = uid();
            const data = { id, label: newIngredients }
            const res = await addNewIngredients(data);
            if (res?.id && res?.label) {
                alert(`New ingredients Added, Name: ${res?.label}`);
                router.push("/addNewRecipes");
            }
            else {
                alert("Something went wrong");
            }
        }
        else {
            alert("Cannot submit with an empty input");
        }
    }
    return (
        <div className='p-6'>
            {/* Add New Ingredients */}
            <div>
                <div className='flex flex-1 flex-col lg:mb-0 md:mb-0 sm:mb-4'>
                    <label htmlFor="select" className='text-white bg-indigo-600 w-full p-2'>Add New Ingredients</label>
                    <input
                        type="text"
                        className="block w-full border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Enter ingredients"
                        value={newIngredients}
                        onChange={(e) => setNewIngredients(e.target.value)}
                        required
                    />
                </div>
                <button
                    onClick={() => handleNewIngredients()}
                    className="mt-4 mr-5 flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Submit
                </button>
                <button
                    className="mt-4 flex-none rounded-md bg-gray-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={() => router.push("/addNewRecipes")}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddIngredient;