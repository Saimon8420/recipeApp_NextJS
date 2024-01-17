import { getEachRecipes } from '@/app/api/recipes';
import EditRecipe from '@/app/components/EditRecipe';
import React from 'react';

const page = async ({ params }) => {
    const { id } = params;
    const data = await getEachRecipes(id);
    return (
        <div className='flex flex-col items-center py-6 px-4'>
            <h1 className='font-bold text-2xl'>Edit Recipe: {data?.title}</h1>
            <EditRecipe data={data} />
        </div>
    );
};

export default page;