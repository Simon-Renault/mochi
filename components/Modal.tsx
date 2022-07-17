import React, { useState } from "react";
import css from "./Modal.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import Portal from "./Portal";
import classNames from "classnames";

interface IModalProps {
	children: React.ReactNode;
	show?: boolean;
	className?: string;
	contentClassName?: string;
}

const Modal = (props: IModalProps) => {
	const { show, children, className, contentClassName } = props;

	return (
		<Portal>
			<AnimatePresence>
				{show && (
					<motion.div
						className={css.overlay}
						initial="initial"
						animate="animate"
						exit="exit"
						variants={fadeInVariant}
					>
						<motion.div
							className={classNames(css.modal, className)}
							initial="initial"
							animate="animate"
							exit="exit"
							variants={mobileMenuVariant}
						>
							<motion.div
								initial="initial"
								animate="animate"
								exit="exit"
								variants={fadeInContentVariant}
								className={classNames(
									css.content,
									contentClassName
								)}
							>
								{children}
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</Portal>
	);
};

export default Modal;

//
// Animations
//

const mobileMenuVariant = {
	initial: {
		y: "100%",
		transition: {
			delay: 0.15,
			duration: 0.33,
			ease: [0.74, 0, 0.19, 1.02],
		},
	},
	animate: {
		y: "0%",
		transition: {
			delay: 0.05,
			duration: 0.6,
			ease: [0.74, 0, 0.19, 1.02],
		},
	},
	exit: {
		y: "100%",
		transition: {
			duration: 0.33,
			ease: [0.74, 0, 0.19, 1.02],
		},
	},
};

const fadeInVariant = {
	animate: {
		opacity: 1,
	},
	initial: {
		opacity: 0,
		transition: {
			delay: 0.1,
		},
	},
	exit: {
		transition: {
			delay: 0.5,
		},
		opacity: 0,
	},
};

const fadeInContentVariant = {
	animate: {
		opacity: 1,
		transition: {
			delay: 0.7,
			ease: "easeIn",
		},
	},
	initial: {
		opacity: 0,
		transition: {
			delay: 0.7,
			ease: "easeIn",
		},
	},
	exit: {
		opacity: 1,
		transition: {
			ease: "easeIn",
		},
	},
};
