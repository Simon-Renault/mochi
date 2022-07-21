import { motion } from "framer-motion";
import { ReactNode } from "react";

interface IPageWrapperProps {
	key: string;
	children: ReactNode;
}

const variants = {
	initial: {
		opacity: 0,
		transition: {
			delay: 0.5,
		},
	},
	animate: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
	exit: {
		opacity: 0,
	},
};

const PageWrapper = ({ key, children }: IPageWrapperProps) => {
	return (
		<motion.div
			initial="initial"
			animate="animate"
			exit="exit"
			variants={variants}
			key={key}
		>
			{children}
		</motion.div>
	);
};

export default PageWrapper;
