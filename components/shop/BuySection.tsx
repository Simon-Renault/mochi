import Button from "@components/Button";
import { useState, useContext } from "react";
import css from "./BuySection.module.scss";
import BuyPrintModal from "@components/shop/BuyPrintModal";
import Modal from "@components/Modal";
import { IVariant } from "@lib/types";
import { Context } from "@lib/shopContext";

interface IcardProps {
	className?: string;
	title?: string;
	children?: React.ReactNode;
}
const Card = (props: IcardProps) => {
	const { title, children, className } = props;
	return (
		<div className={[css.card, className].join(" ")}>
			<h4 className={css.card_title}>{title}</h4>
			{children}
		</div>
	);
};

//Extract to component
interface IDividerProps {
	text: string;
}

const Divider = (props: IDividerProps) => {
	const { text } = props;
	return <div className={css.divider}>{text}</div>;
};
//

interface IBuySectionProps {
	original: IVariant;
	prints: IVariant[];
}

export default function BuySection(props: IBuySectionProps) {
	const { original, prints } = props;
	const [showModal, setShowModal] = useState(false);
	const { addToCart, cartItems } = useContext(Context);

	const handleAddToCart = async () => {
		addToCart([...cartItems, original]);
	};

	return (
		<>
			<div className={css.section}>
				<Card title="Buy">
					<p className={css.description}>
						All items comes with handmade packaging and a few
						extras.
					</p>
					<Button fill onClick={() => setShowModal(true)}>
						Buy a Print — from 50€
					</Button>
					<Divider text="or" />
					{original && (
						<Button fill outlined onClick={handleAddToCart}>
							Buy the Original — {original.price.amount}€
						</Button>
					)}
				</Card>
				<Card title="Details" className={css.details}>
					<div className={css.details_wrapper}>
						<div className={css.detail}>
							<div>Technique</div>
							<div className={css.value}>Rotring fineliner</div>
						</div>
						<div className={css.detail}>
							<div>Support</div>
							<div className={css.value}>350g bristol paper</div>
						</div>
					</div>
				</Card>
			</div>
			<Modal show={showModal}>
				<BuyPrintModal
					prints={prints}
					onClose={() => setShowModal(false)}
				/>
			</Modal>
		</>
	);
}
