import { useContext } from 'react';
import FormContext from "~/context/FormContext";

const AddInstructions = () => {
	const foodContext = useContext(FormContext); 
	const pageDisplay = foodContext?.step === 2 ? 'block' : 'hidden'; 

	return (
		<div className={`${pageDisplay} px-2`}>
			<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
				<h3 className="pt-2 text-base font-semibold leading-6 text-gray-900">Instructions</h3>
				<section className="pb-4">
					<div className="relative mt-3 pr-4">
						<textarea id="instruction" className="block rounded-t-lg pl-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
						<label htmlFor="instruction" className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Instruction*</label>
					</div>
				</section>
			</div>
		</div>
	);
}


export default AddInstructions;