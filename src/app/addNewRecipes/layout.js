export const metadata = {
    title: 'Add new recipes',
    description: 'this is a add new recipes page',
}

export default function AddNewRecipesLayout({ children }) {
    return (
        <div className="py-8 px-4">
            <h1 className="text-center mb-4 text-2xl font-bold">Add a new Recipe</h1>
            {children}
        </div>
    )
}
