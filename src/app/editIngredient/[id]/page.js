import { getEachIngredients } from '@/app/api/ingredients';
import EditIngredient from '@/app/components/EditIngredient';
import React from 'react';

const page = async ({ params }) => {
    const { id } = params;
    const getData = await getEachIngredients(id);
    return (
        <div>
            <EditIngredient value={getData} />
        </div>
    );
};

export default page;