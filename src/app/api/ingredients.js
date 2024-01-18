export const getIngredients = async () => {
    const res = await fetch("http://localhost:9000/ingredients", { cache: "no-store" });
    return res.json();
}

export const getEachIngredients = async (id) => {
    const res = await fetch(`http://localhost:9000/ingredients/${id}`, { cache: "no-store" });
    return res.json();
}

export const addNewIngredients = async (data) => {
    const response = await fetch("http://localhost:9000/ingredients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export const updateIngredients = async (data) => {
    const res = await fetch(`http://localhost:9000/ingredients/${data?.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data?.data)
    });
    return res.json();
}

export const deleteIngredients = async (id) => {
    const response = await fetch(`http://localhost:9000/ingredients/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}