import { type PropsWithChildren } from "react";
import Link from "next/link";

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<nav className="bg-emerald-500 px-1">
				<div className="flex items-center justify-between space-x-4 px-3 py-2">
					<h4 className="text-stone-100 text-lg font-semibold">Foodie Love</h4>
					<div>
						<Link href="/" 
							  className="text-stone-100 hover:bg-emerald-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
							Recipe
						</Link>
					</div>
				</div>
			</nav>
			{children}
		</>
	);
};

export default Layout;