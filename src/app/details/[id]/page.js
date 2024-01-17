import { getEachRecipes } from '@/app/api/recipes';
import Link from 'next/link';
import React from 'react';

const RecipeDetails = async ({ params }) => {
    const { id } = params;
    const data = await getEachRecipes(id);
    return (
        <div className='flex flex-col items-center justify-items-center m-10 gap-8'>
            <h1 className='font-bold text-3xl'><span>Title: </span>{data?.title}</h1>

            <div className='flex gap-5'>
                <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <Link href={`/editRecipe/${id}`}>Edit</Link>
                </button>
                <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <Link href={"/"}>Back</Link>
                </button>
            </div>

            <div className='flex flex-col gap-2 shadow-sm p-2 bg-white rounded-sm'>
                <label htmlFor="ingredients" className='font-bold text-center mx-auto'>Ingredients</label>
                <ul className='gap-5 sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4'>
                    {
                        data.ingredients.map(each => <li>{each}</li>)
                    }
                </ul>
            </div>
            <img className='sm:w-1/2 md:1/2 lg:1/4 rounded-md' src={data?.image} alt="recipe image" />
            <p className='text-justify'><span className='font-bold'>Instructions: </span>{data?.instructions}</p>
        </div>
    );
};

export default RecipeDetails;