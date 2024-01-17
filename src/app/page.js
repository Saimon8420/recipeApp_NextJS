import DisplayRecipe from "./components/DisplayRecipe";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-4 gap-4">
      <h1 className="text-4xl font-bold text-center">Recipe App</h1>
      <DisplayRecipe />
    </main>
  )
}
