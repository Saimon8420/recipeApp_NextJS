"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateIngredients } from '../api/ingredients';

const EditIngredient = ({ value }) => {
    const router = useRouter();

    // to receive new ingredients user input
    const [newIngredients, setNewIngredients] = useState(value?.label);

    const handleEditIngredients = async () => {
        const data = { id: value?.id, data: { id: value?.id, label: newIngredients } };
        const res = await updateIngredients(data);
        if (res?.id && res?.label) {
            alert(`Data ${res.label} successfully updated`);
            router.push("/addNewRecipes");
        }
        else {
            alert("Something went wrong!")
        }
    }
    return (
        <div className='p-6'>
            {/* Add New Ingredients */}
            <div>
                <div className='flex flex-1 flex-col lg:mb-0 md:mb-0 sm:mb-4'>
                    <label htmlFor="select" className='text-white bg-indigo-600 w-full p-2'>Edit Ingredients</label>
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
                    onClick={() => handleEditIngredients()}
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

export default EditIngredient;