import Button from "@components/Button";
import css from "./BuySection.module.scss";

interface IcardProps {
	title?: string;
	children?: JSX.Element | JSX.Element[] | string;
}
const Card = (props: IcardProps) => {
	const { title, children } = props;
	return (
		<div className={css.card}>
			<h4 className={css.card_title}>{title}</h4>
			{children}
		</div>
	);
};

interface IDividerProps {
	text: string;
}

const Divider = (props: IDividerProps) => {
	const { text } = props;
	return <div className={css.divider}>{text}</div>;
};

export default function BuySection() {
	return (
		<div className={css.section}>
			<Card title="Buy">
				<p className={css.description}>
					All items comes with handmade packaging and a few extras.
				</p>
				<Button fill> Buy a Print — from 50€</Button>
				<Divider text="or" />
				<Button fill outlined>
					Buy the Original — 1,200€
				</Button>
			</Card>
			<Card title="Details">
				<div className={css.details}>
					<div className={css.detail}>
						<div className={css.key}>Technique</div>
						<div className={css.value}>Rotring fineliner</div>
					</div>
					<div className={css.detail}>
						<div className={css.key}>Support</div>
						<div className={css.value}>350g bristol paper</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
