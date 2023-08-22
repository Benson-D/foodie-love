import { useContext } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import FormContext from "~/context/FormContext";

const AddInstructions = () => {
	const { register, control } = useFormContext();

	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
		name: "instructions", 
		control
	  });
	  
	const foodContext = useContext(FormContext); 
	const pageDisplay = foodContext?.step === 2 ? 'block' : 'hidden'; 

	return (
		<div className={`${pageDisplay} px-2`}>
			<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
				<h3 className="pt-2 text-base font-semibold leading-6 text-gray-900">Instructions</h3>
				<section className="pb-4">
					{fields.map((instruction, index) => (
						<div key={instruction.id} className="relative mt-8 pr-4">
							<textarea {...register(`instructions.${index}.instruction`)} className="block rounded pl-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 border border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
							<label htmlFor="instruction-1" className="absolute top-2 left-2.5 text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 z-10 origin-[0] peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Instruction</label>
						</div>
					))}
				</section>
				
			</div>
		</div>
	);
}


export default AddInstructions;