import { type NextPage } from "next";
import Image from "next/image";
import { api } from "~/utils/api";
import MainModal from "~/components/MainModal";

const Home: NextPage = () => {

  const { data } = api.recipe.getAll.useQuery();
  const recipes = data ?? [];

  return (
    <>
      <main>
        <nav className="py-4 px-4">
          <div className="border-b-2 border-gray-200">
            <MainModal />
          </div>
        </nav>
        <section className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-6 py-2 px-4">
            {recipes.map((recipe) => (
                <article key={recipe.id} className="w-full rounded overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 cursor-pointer">
                  <Image
                    src={recipe?.recipeImage ?? "/default-image.jpg"} 
                    alt={recipe?.recipeImage ? recipe.name : "recipe-default-image"} 
                    width={400} 
                    height={400} />
                  <header className="px-6 py-4">
                    <div className="font-bold text-xl capitalize mb-2">{recipe.name}</div>
                    <p className="text-gray-600 text-base">Prep Time: {recipe.prepTime ?? '-'}</p>
                    <p className="text-gray-600 text-base">Cooking Time: {recipe.cookingTime}</p>
                  </header>
                  <footer className="px-6 py-2 flex">
                    <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 ml-auto">
                      #{recipe.mealType?.toLowerCase()}
                    </span>
                  </footer>
                </article>
            ))}
          </div>
        </section>
        
      </main>
    </>
  );
};

export default Home;
