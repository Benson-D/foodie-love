import { useContext } from 'react';
import { 
	useFormContext, 
	useFieldArray, 
	type UseFormRegister, 
	type FieldValues,
	type UseFieldArrayRemove
} from 'react-hook-form';
import FormContext from "~/context/FormContext";

interface IngredientProps {
	index: number;
	register: UseFormRegister<FieldValues>;
	remove: UseFieldArrayRemove
}

const Ingredient = ({ index, register, remove }: IngredientProps): JSX.Element => {

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-2 relative">
			<div className="relative mt-3 pr-4">
				<input {...register(`ingredients[${index}].amount` as const, {
							required: "An amount is required"
						})} type="number" className="block rounded-t-lg pl-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
				<label className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Amount</label>	
			</div> 
			<div className="relative mt-3 pr-4">
				<input {...register(`ingredients.${index}.measurement` as const)} className="block rounded-t-lg pl-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
					<label className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Measurement</label>
			</div> 
			<div className="relative mt-3 pr-4">
				<input {...register(`ingredients.${index}.ingredient`, {
							required: {
								value: true,
								message: "An ingredient is required"
							}
						})} className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
					<label className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Ingredient</label>
			</div>
			<div className="mt-8">
				<button className="border text-sm py-1 px-4 hover:bg-red-400 hover:text-stone-100" 
						onClick={() => remove(index)}>Delete</button>
			</div>
		</div>
	);
}


const AddIngredients = () => {
	const { register, control, formState: { errors }} = useFormContext();

	const { fields, append, remove } = useFieldArray(
		{ 
			control,
			name: "ingredients", 
			rules: { minLength: 1 } 
	});

	console.log(errors, 'check value two');

	const foodContext = useContext(FormContext); 
	const pageDisplay = foodContext?.step === 1 ? 'block' : 'hidden'; 

	const addIngredient = () => append(
		{ amount: 1, measurement: '', ingredient: '' });

	return (
		<div className={`${pageDisplay} px-2`}>
			<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
				<h3 className="pt-2 text-base font-semibold leading-6 text-gray-900">Ingredients</h3>
				<section className="pb-4">
					{fields.map((item, index) => (
						<Ingredient 
							key={item.id} 
							index={index} 
							register={register} 
							remove={remove} />
					))}
					<div className="mt-5">
						<button className="bg-emerald-500 text-stone-100 text-sm py-1 px-3 rounded" 
								onClick={addIngredient}>Add Ingredient</button>
					</div>
				</section>
			</div>
		</div>
	);
};

export default AddIngredients;