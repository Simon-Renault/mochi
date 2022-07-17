import Button from "@components/Button";
import dynamic from "next/dynamic";
import { useState } from "react";
import css from "./BuySection.module.scss";

import BuyPrintModal from "@components/shop/BuyPrintModal";
import Modal from "@components/Modal";

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

export default function BuySection() {
	const [showModal, setShowModal] = useState(false);

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
					<Button
						fill
						outlined
						onClick={() => {
							console.log("heyyy");
						}}
					>
						Buy the Original — 1,200€
					</Button>
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
				<BuyPrintModal onClose={() => setShowModal(false)} />
			</Modal>
		</>
	);
}
