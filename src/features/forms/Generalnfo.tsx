import { useContext } from 'react';
import FormContext from "~/context/FormContext";

const GeneralInfo = () => {

	const foodContext = useContext(FormContext); 
	const pageDisplay = foodContext?.step === 0 ? 'block' : 'hidden'; 

	return (
		<div className={`${pageDisplay} px-2`}>
			<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
				<h3 className="pt-2 text-base font-semibold leading-6 text-gray-900">General Info</h3>
				<section className="grid grid-cols-2 gap-9 pb-4">
					<div className="relative mt-3 pr-4">
						<input type="text" id="recipe-name" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
							<label htmlFor="recipe-name" className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4" >Recipe Name*</label>
					</div>
					<div className="relative mt-3 pr-4">
						<input type="text" id="meal-type" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
							<label htmlFor="meal-type" className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Meal Type</label>
					</div>
					<div className="relative mt-3 pr-4">
						<input type="number" id="prep-time" className="block rounded-t-lg pl-2.5 pb-2.5 pt-5 pr-16 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
							<label htmlFor="prep-time" className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Prep Time</label>
						<span className="absolute right-2.5 top-5 px-2 text-sm text-gray-400 ">Minutes</span>
					</div> 
					<div className="relative mt-3 pr-4">
						<input type="number" id="cooking-time" className="block rounded-t-lg pl-2.5 pb-2.5 pt-5 pr-16 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
							<label htmlFor="cooking-time" className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Cooking Time*</label>
						<span className="absolute right-2.5 top-5 px-2 text-sm text-gray-400 ">Minutes</span>
					</div> 
				</section>
			</div>
		</div>
	);
};


export default GeneralInfo;