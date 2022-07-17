import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import css from "./Modal.module.scss";

import { X } from "react-feather";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";

interface IModalProps {
	show: boolean;
	onClose: () => void;
	children: React.ReactNode | string;
	title?: string | JSX.Element;
}

interface ISelectableCardProps {
	title: string;
	price: string;
	dimensions: string;
	isSelected: Boolean;
	onClick: () => void;
}

const VARIANTS = [
	{
		title: "Medium",
		price: "50€",
		dimensions: "21 x 29.7cm",
		message:
			"Perfect as a present or to display in a small space. Fine details can only be discovered up close.",
	},
	{
		title: "Small",
		price: "100€",
		dimensions: "29.7 x 42cm",
		message:
			"The artwork as it was intended to be seen. Perfect for all room size",
	},
	{
		title: "Large",
		price: "200€",
		dimensions: "42 x 59.4cm",
		message:
			"Larger print to appreciate the details from afar. Suits best medium to large rooms.",
	},
];

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

const fadeIn = {
	animate: {
		opacity: 1,
		transition: {
			ease: "easeIn",
		},
	},
	initial: {
		opacity: 0,
		transition: {
			ease: "easeIn",
		},
	},
};

const SelectableCard = (props: ISelectableCardProps) => {
	const { title, price, dimensions, isSelected, onClick } = props;
	return (
		<div
			onClick={onClick}
			className={[css.selectable_card, isSelected && css.selected].join(
				" "
			)}
		>
			<p className={css.card_title}>{title}</p>
			<p className={css.card_dimension}>{dimensions}</p>
			<div className={css.divider}></div>
			<p className={css.card_price}>{price}</p>
		</div>
	);
};

const Modal = (props: IModalProps) => {
	const { show, onClose, children, title } = props;
	const [isBrowser, setIsBrowser] = useState(false);
	const [selectedCard, setSelectedCard] = useState(0);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	const handleCloseClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		onClose();
	};

	const modalContent = (
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
						className={css.modal}
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
							className={css.preview}
						>
							<div className={css.preview_image}></div>
							<div className={css.thumbnails}>
								<div className={css.thumbnail}></div>
								<div className={css.thumbnail}></div>
								<div className={css.thumbnail}></div>
							</div>
						</motion.div>
						<motion.div
							initial="initial"
							animate="animate"
							exit="exit"
							variants={fadeInContentVariant}
							className={css.config}
						>
							<header className={css.header}>
								<h3 className={css.modal_title}>
									About prints
								</h3>
								<div
									className={css.close_bottom}
									onClick={handleCloseClick}
								>
									<X />
								</div>
							</header>
							<main className={css.main}>
								<p>
									All prints are made on high quality 300g
									paper and are archival quality. They come
									hanpacked by myself with a few surprises.
								</p>
								<div className={css.divider}></div>
								<h3 className={css.title}>Pick a Size :</h3>
								<div className={css.size_picker}>
									{VARIANTS.map((card, index) => {
										return (
											<SelectableCard
												title={card.title}
												dimensions={card.dimensions}
												price={card.price}
												isSelected={
													selectedCard == index
												}
												onClick={() =>
													setSelectedCard(index)
												}
												key={`variant-${index}`}
											/>
										);
									})}
								</div>
								<AnimatePresence exitBeforeEnter>
									{VARIANTS.map((card, index) => {
										return (
											index == selectedCard && (
												<motion.p
													initial="initial"
													animate="animate"
													exit="initial"
													variants={fadeIn}
													key={`msg-${index}`}
												>
													{card.message}
												</motion.p>
											)
										);
									})}
								</AnimatePresence>
							</main>
							<footer className={css.footer}>
								<Button fill>
									Add to cart — {VARIANTS[selectedCard].price}
								</Button>
							</footer>
						</motion.div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);

	if (isBrowser) {
		const el = document.getElementById("modal-root");
		if (el) {
			return ReactDOM.createPortal(modalContent, el);
		}
		return null;
	}
	return null;
};

export default Modal;
