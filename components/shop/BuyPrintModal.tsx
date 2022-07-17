import React, { useState } from "react";
import css from "./BuyPrintModal.module.scss";
import Button from "@components/Button";
import { PRINT_VARIANTS } from "@lib/config";
import { X } from "react-feather";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";

interface IBuyPrintModalProps {
	show?: boolean;
	onClose: () => void;
	title?: string | JSX.Element;
}

const BuyPrintModal = (props: IBuyPrintModalProps) => {
	const { onClose } = props;
	const [selectedCard, setSelectedCard] = useState(0);
	const handleCloseClick = () => onClose();

	return (
		<div className={css.split_body}>
			<div className={css.preview}>
				<div className={css.preview_image}></div>
				<div className={css.thumbnails}>
					<div className={css.thumbnail}></div>
					<div className={css.thumbnail}></div>
					<div className={css.thumbnail}></div>
				</div>
			</div>
			<div className={css.config}>
				<header className={css.header}>
					<h3 className={css.modal_title}>About prints</h3>
					<div
						className={css.close_bottom}
						onClick={handleCloseClick}
					>
						<X />
					</div>
				</header>
				<main className={css.main}>
					<p>
						All prints are made on high quality 300g paper and are
						archival quality. They come hanpacked by myself with a
						few surprises.
					</p>
					<div className={css.divider}></div>
					<h3 className={css.title}>Pick a Size :</h3>
					<div className={css.size_picker}>
						{PRINT_VARIANTS.map((card, index) => {
							return (
								<SelectableCard
									title={card.title}
									dimensions={card.dimensions}
									price={card.price}
									isSelected={selectedCard == index}
									onClick={() => setSelectedCard(index)}
									key={`variant-${index}`}
								/>
							);
						})}
					</div>
					<AnimatePresence exitBeforeEnter>
						{PRINT_VARIANTS.map((card, index) => {
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
						Add to cart — {PRINT_VARIANTS[selectedCard].price}
					</Button>
				</footer>
			</div>
		</div>
	);
};

export default BuyPrintModal;

//
// Selectable card
//

interface ISelectableCardProps {
	title: string;
	price: string;
	dimensions: string;
	isSelected: Boolean;
	onClick: () => void;
}

/* >Extract to Component */
const SelectableCard = (props: ISelectableCardProps) => {
	const { title, price, dimensions, isSelected, onClick } = props;
	return (
		<div
			onClick={onClick}
			className={classNames(
				css.selectable_card,
				isSelected && css.selected
			)}
		>
			<p className={css.card_title}>{title}</p>
			<p className={css.card_dimension}>{dimensions}</p>
			<div className={css.divider}></div>
			<p className={css.card_price}>{price}</p>
		</div>
	);
};

//
// Animations
//

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
