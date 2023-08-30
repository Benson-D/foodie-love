import FormContext from "~/context/FormContext";
import GeneralInfo from "../forms/Generalnfo";
import useStep from "~/hooks/useStep";
import AddIngredients from "../forms/AddIngredients";
import AddInstructions from "../forms/AddInstructions";
import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";

interface FormValues  {
	recipeName: string;
	mealType: string;
	prepTime: number | string;
	cookingTime: number | string;
	ingredients: {
		amount: number | string;
		measurement: string | undefined;
		ingredient: string;
	}[];
	instructions: {
		instruction: string | undefined;
	}[]
}

const AddRecipe = (): JSX.Element => {
	const [step, helpers] = useStep(3);
	const methods = useForm<FormValues>({
		defaultValues: {
			recipeName: "",
			mealType: "",
			prepTime: "",
			cookingTime: "",
			ingredients: [
				{ amount: 1, measurement: '', ingredient: ''},
				{ amount: 1, measurement: '', ingredient: ''}, 
				{ amount: 1, measurement: '', ingredient: ''},
			    { amount: 1, measurement: '', ingredient: ''},   
			],
			instructions: [
				{ instruction: ''},
				{ instruction: ''},
				{ instruction: ''},
				{ instruction: ''},
				{ instruction: ''},
			]
		},
		mode: "all"
	});

	const {
		canGoToPreviousStep,
		canGoToNextStep,
		previousStep,
		nextStep
    } = helpers;

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data, "<===data validation")
	};

	return (
		<FormContext.Provider value={{step}}>
			<FormProvider {...methods}>
				<form onSubmit={(evt) => void methods.handleSubmit(onSubmit)(evt)}>
					<GeneralInfo />
					<AddIngredients />
					<AddInstructions />
					<footer className="bg-gray-50 py-3 flex justify-between px-2">
						{
							canGoToPreviousStep && ( 
							<button type="button" 
									className="mt-3 inline-flex w-40 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
									onClick={() => previousStep()}>Back</button>)
						}		
						<button type={canGoToNextStep ? "button" : "submit"} 
								className={`mt-3 inline-flex w-40 justify-center rounded-md bg-sky-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-900 ${canGoToPreviousStep ? '' : 'ml-auto'}`}
								onClick={() => nextStep()}>
									{canGoToNextStep ? 'Next' : 'Submit'}
						</button>
					</footer>
				</form>
			</FormProvider>
		</FormContext.Provider>
	);
};


export default AddRecipe;