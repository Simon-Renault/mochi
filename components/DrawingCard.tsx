import React from "react";
import Link from "next/link";
import Image from "next/image";
import css from "./DrawingCard.module.scss";
import { IDrawing } from "@lib/types";
import currency from "currency.js";

interface IDrawingCardProps {
	drawing: IDrawing;
	className?: string;
}

const DrawingCard = (props: IDrawingCardProps): JSX.Element => {
	const { title, path, cover, minPrice, maxPrice } = props.drawing;
	return (
		<Link href={path}>
			<a className={[css.drawingCard, props.className].join(" ")}>
				<div className={css.imageContainer}>
					<Image
						className={css.image}
						src={cover.src}
						alt={cover.altText}
						width={cover.width}
						height={cover.height}
						quality={10}
						unoptimized={true}
					/>
				</div>
				<div className={css.description}>
					<p className={css.title}>{title}</p>
					<p className={css.price}>
						{currency(minPrice, { precision: 1 }).value} -
						{currency(maxPrice, { precision: 0 }).value}€
					</p>
				</div>
			</a>
		</Link>
	);
};

export default DrawingCard;
