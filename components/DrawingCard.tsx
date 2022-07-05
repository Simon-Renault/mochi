import React from "react";
import Link from "next/link";
import css from "./DrawingCard.module.scss";

interface IDrawingCardProps {
	path: string;
	image: {
		url: string;
		alt?: string;
	};
	title: string;
	date?: string;
}

const DrawingCard = (props: IDrawingCardProps): JSX.Element => {
	const { image, title, path } = props;
	console.log(image.url);
	return (
		<Link href={path}>
			<a className={css.drawingCard}>
				<div className={css.imageContainer}>
					<img src={image.url} width="100%" alt="" loading="lazy" />
				</div>
				<div className={css.description}>
					<p className={css.title}>{title}</p>
					<p className={css.price}>120€</p>
				</div>
			</a>
		</Link>
	);
};

export default DrawingCard;
