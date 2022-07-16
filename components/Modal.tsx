import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import css from "./Modal.module.scss";

import { X } from "react-feather";
import Button from "./Button";

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

	const modalContent = show ? (
		<div className={css.overlay}>
			<div className={css.modal}>
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
							All prints are made on high quality 300g paper and
							are archival quality. They come hanpacked by myself
							with a few surprises. c
						</p>
						<div className={css.divider}></div>
						<h3 className={css.title}>Pick a Size</h3>
						<div className={css.size_picker}>
							{VARIANTS.map((card, index) => {
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
						<p>{VARIANTS[selectedCard].message}</p>
					</main>
					<footer className={css.footer}>
						<Button fill>Add to cart — 50€</Button>
					</footer>
				</div>
			</div>
		</div>
	) : null;

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
