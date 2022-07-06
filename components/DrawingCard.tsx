import React from "react";
import Link from "next/link";
import Image from "next/image";
import css from "./DrawingCard.module.scss";
import { IDrawing } from "@lib/types";

interface IDrawingCardProps {
	drawing: IDrawing;
}

const DrawingCard = (props: IDrawingCardProps): JSX.Element => {
	const { title, path, cover } = props.drawing;
	return (
		<Link href={path}>
			<a className={css.drawingCard}>
				<div className={css.imageContainer}>
					<Image
						className={css.image}
						{...cover}
						alt="Picture of the author"
						placeholder="blur"
					/>
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
