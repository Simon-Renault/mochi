import { motion } from "framer-motion";
import { ReactNode } from "react";

interface IPageWrapperProps {
	id: string;
	children: ReactNode;
}

const variants = {
	initial: {
		opacity: 0,
		transition: {
			duration: 1,
		},
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 1,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 1,
		},
	},
};

const PageWrapper = ({ id, children }: IPageWrapperProps) => {
	return (
		<motion.div
			initial="initial"
			animate="animate"
			exit="exit"
			variants={variants}
			key={id}
		>
			{children}
		</motion.div>
	);
};

export default PageWrapper;
