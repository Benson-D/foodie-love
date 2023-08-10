import useToggle from "~/hooks/useToggle";

/**
 * MainModal Component
 *
 * This component represents a customizable modal dialog for displaying content and user interactions.
 * It provides a clean and responsive layout with options to toggle the modal's visibility 
 * and handle user actions.
 */
const MainModal = (): JSX.Element => {
	const [value, toggleValue] = useToggle();

	const handleTogglePopup = (bool?: boolean): void => toggleValue(bool);

	const fullCssModalDisplay = value 
	? "ease-out duration-300 opacity-100" 
	: "ease-in duration-200 opacity-0 pointer-events-none";

	const mainCssModalDisplay = value 
	? "ease-out duration-300 opacity-100 translate-y-0 sm:scale-100" 
	: "ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 pointer-events-none";

	return (
		<>
			<button className="border border-sky-900 border-b-0 hover:bg-gray-100 text-sm text-sky-900 py-1 px-4"
                    onClick={() => handleTogglePopup()}>
                      Create
            </button>
			<div className={`relative z-10 ${fullCssModalDisplay}`} 
				aria-labelledby="modal-title" 
				role="dialog" 
				aria-modal="true">
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<div className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${mainCssModalDisplay}`}>
							<article className="bg-white">
								<header className="bg-emerald-500 px-4 py-3 flex justify-between">
									<h4 className="text-stone-100 pt-1">Create Form</h4>
									<button type="button" 
											className="text-stone-100 bg-transparent hover:bg-emerald-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-emerald-400 dark:hover:text-white" 
											data-modal-hide="defaultModal"
											onClick={() => handleTogglePopup(false)}>
										<svg className="w-3 h-3" 
											 aria-hidden="true" 
											 xmlns="http://www.w3.org/2000/svg" 
											 fill="none" 
											 viewBox="0 0 14 14">
											<path stroke="currentColor" 
												  stroke-linecap="round" 
												  stroke-linejoin="round" 
												  stroke-width="2" 
												  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
										</svg>
										<span className="sr-only">Close modal</span>
									</button>
								</header>
								<div className="sm:flex sm:items-start px-2">
									<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
									<h3 className="pt-2 text-base font-semibold leading-6 text-gray-900" id="modal-title">General Info</h3>
									<form className="grid grid-cols-2 gap-9 pb-4">
										<div className="relative mt-3 pr-4">
    										<input type="text" id="recipe-name" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
   											 <label htmlFor="recipe-name" className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Recipe Name*</label>
										</div>
										<div className="relative mt-3 pr-4">
    										<input type="text" id="meal-type" className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
   											 <label htmlFor="meal-type" className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Meal Type</label>
										</div>
										<div className="relative mt-3 pr-4">
    										<input type="number" id="prep-time" className="block rounded-t-lg pl-2.5 pb-2.5 pt-5 pr-16 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
   											 <label htmlFor="prep-time" className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Prep Time</label>
											<span className="absolute right-2.5 top-5 px-2 text-sm text-gray-400 ">Minutes</span>
										</div> 
										<div className="relative mt-3 pr-4">
    										<input type="number" id="cooking-time" className="block rounded-t-lg pl-2.5 pb-2.5 pt-5 pr-16 w-full text-sm text-gray-900 border-0 border-b border-gray-300 appearance-none dark:border-gray-400 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
   											 <label htmlFor="cooking-time" className="absolute text-sm text-stone-700 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Cooking Time*</label>
											<span className="absolute right-2.5 top-5 px-2 text-sm text-gray-400 ">Minutes</span>
										</div> 
									</form>
									</div>
								</div>
							</article>
							<footer className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse sm:px-6 md:justify-between">
								<button type="button" className="inline-flex w-40 justify-center rounded-md bg-sky-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-900 sm:ml-3">Next</button>
								{/* <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0">Cancel</button> */}
							</footer>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MainModal;