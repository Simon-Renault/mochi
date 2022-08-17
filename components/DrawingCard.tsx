import React from "react";
import Link from "next/link";
import Image from "next/image";
import css from "./DrawingCard.module.scss";
import currency from "currency.js";
import { motion } from "framer-motion";
import { storyblokEditable, StoryData } from "@storyblok/react";
import { ArtworkStoryblok } from "typings/components-schema";

interface IDrawingCardProps {
	drawing: StoryData<ArtworkStoryblok>;
	className?: string;
}

const DrawingCard = ({
	drawing,
	className,
}: IDrawingCardProps): JSX.Element => {
	const { cover, largePrice, smallPrice } = drawing.content;
	return (
		<Link href={drawing.full_slug}>
			<a className={className} {...storyblokEditable(drawing.content)}>
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
						{cover?.filename && (
							<Image
								className={css.image}
								src={cover?.filename}
								alt={cover?.alt}
								width={600}
								height={800}
								quality={10}
								unoptimized={true}
							/>
						)}
					</div>
					<div className={css.description}>
						<p className={css.title}>{drawing.name}</p>
						<p className={css.price}>
							{largePrice &&
								currency(largePrice, { precision: 1 })
									.value}{" "}
							-
							{smallPrice &&
								currency(smallPrice, { precision: 0 }).value}
							€
						</p>
					</div>
				</motion.div>
			</a>
		</Link>
	);
};

export default DrawingCard;
