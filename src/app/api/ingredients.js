export const getIngredients = async () => {
    const res = await fetch("http://localhost:9000/ingredients", { cache: "no-store" });
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