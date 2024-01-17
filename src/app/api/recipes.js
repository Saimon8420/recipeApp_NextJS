export const getAllRecipes = async () => {
    const res = await fetch("http://localhost:9001/recipes", { cache: "no-store" });
    return res.json();
}

export const addRecipes = async (data) => {
    const res = await fetch("http://localhost:9001/recipes", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })

    return res.json();
}

export const getEachRecipes = async (id) => {
    const res = await fetch(`http://localhost:9001/recipes/${id}`, { cache: "no-store" });
    return res.json();
}

export const updateRecipes = async (data) => {
    const res = await fetch(`http://localhost:9001/recipes/${data?.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data?.data)
    })

    return res.json();
}

export const deleteRecipes = async (id) => {
    const res = await fetch(`http://localhost:9001/recipes/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
    })

    return res.json();
}