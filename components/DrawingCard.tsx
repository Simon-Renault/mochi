import React from "react";
import Link from "next/link";
import Image from "next/image";
import css from "./DrawingCard.module.scss";
import { ArtworkStoryblok } from "@typings/components-schema";
import { motion } from "framer-motion";
import { storyblokEditable, StoryData } from "@storyblok/react";

interface IDrawingCardProps {
	blok: StoryData<ArtworkStoryblok>;
	className: string;
}

const DrawingCard = ({ blok, className }: IDrawingCardProps): JSX.Element => {
	if (!blok) return <div>No block</div>;
	return (
		<Link href={`drawings/${blok.slug}`} key={blok.content._uid}>
			<a className={className} {...storyblokEditable(blok.content)}>
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
					{blok.content.cover && (
						<div className={css.imageContainer}>
							<Image
								className={css.image}
								src={blok.content.cover.filename}
								width={600}
								height={800}
								quality={10}
								unoptimized={true}
							/>
						</div>
					)}
					<div className={css.description}>
						<p className={css.title}>{blok.name}</p>
						<p className={css.price}>100 - 250€</p>
					</div>
				</motion.div>
			</a>
		</Link>
	);
};

export default DrawingCard;
