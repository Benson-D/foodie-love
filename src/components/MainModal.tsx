import useToggle from "~/hooks/useToggle";
import AddRecipe from "~/features/AddRecipe/AddRecipe";

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
	: "ease-in duration-200 opacity-0 translate-y-2 sm:translate-y-0 sm:scale-95 pointer-events-none";

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
							<article className="bg-white min-w-[340px]">
								<header className="bg-emerald-500 px-4 py-3 flex justify-between">
									<h4 className="text-stone-100 pt-1 pl-2">Create Form</h4>
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
												  strokeLinecap="round" 
												  strokeLinejoin="round" 
												  strokeWidth="2" 
												  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
										</svg>
										<span className="sr-only">Close modal</span>
									</button>
								</header>
								<AddRecipe />
							</article>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MainModal;