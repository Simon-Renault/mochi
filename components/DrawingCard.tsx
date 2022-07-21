import React from "react";
import Link from "next/link";
import Image from "next/image";
import css from "./DrawingCard.module.scss";
import { IDrawing } from "@lib/types";
import currency from "currency.js";
import classNames from "classnames";
import { motion } from "framer-motion";

interface IDrawingCardProps {
	drawing: IDrawing;
	className?: string;
}

const DrawingCard = (props: IDrawingCardProps): JSX.Element => {
	const { title, path, cover, minPrice, maxPrice } = props.drawing;
	return (
		<Link href={path}>
			<a className={props.className}>
				<motion.div
					whileHover={{
						y: -20,
						transition: {
							duration: 0.1,
							ease: "easeIn",
						},
					}}
					whileTap={{
						scale: 0.95,
						transition: {
							duration: 0.1,
							ease: "easeIn",
						},
					}}
					className={css.drawingCard}
				>
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
				</motion.div>
			</a>
		</Link>
	);
};

export default DrawingCard;
