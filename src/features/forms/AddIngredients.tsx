import { useContext } from 'react';
import FormContext from "~/context/FormContext";


const Ingredient = ({ index }: { index: number }): JSX.Element => {
	return (
		<div className="grid grid-cols-3 gap-2 relative">
			<div className="relative mt-3 pr-4">
				<input type="number" id={`amount-${index}`} className="block rounded-t-lg pl-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
				<label htmlFor={`amount-${index}`} className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Amount*</label>
			</div> 
			<div className="relative mt-3 pr-4">
				<input type="number" id={`measurement-${index}`} className="block rounded-t-lg pl-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
					<label htmlFor={`measurement-${index}`} className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Measurement</label>
			</div> 
			<div className="relative mt-3 pr-4">
				<input type="text" id={`ingredient-${index}`} className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
					<label htmlFor={`ingredient-${index}`} className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Ingredient*</label>
			</div>
		</div>
	);
}


const AddIngredients = () => {

	const foodContext = useContext(FormContext); 
	const pageDisplay = foodContext?.step === 1 ? 'block' : 'hidden'; 
	const initialIngredients = [1, 2, 3, 4, 5]

	return (
		<div className={`${pageDisplay} px-2`}>
			<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
				<h3 className="pt-2 text-base font-semibold leading-6 text-gray-900">Ingredient List</h3>
				<section className="pb-4">
					{initialIngredients.map((_, idx) => (
						<Ingredient
							key={idx}
							index={idx}
						/>
					))}
				</section>
			</div>
		</div>
	);
};

export default AddIngredients;