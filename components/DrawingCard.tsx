import React from "react";
import Link from "next/link";
import Image from "next/image";
import css from "./DrawingCard.module.scss";

import currency from "currency.js";
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";

const DrawingCard = ({ blok, className }): JSX.Element => {
	if (!blok) return <div>No block</div>;
	return (
		<Link href={`drawings/${blok.slug}`}>
			<a className={className} {...storyblokEditable(blok)}>
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
						{/* <p className={css.price}>
							{currency(minPrice, { precision: 1 }).value} -
							{currency(maxPrice, { precision: 0 }).value}€
						</p> */}
					</div>
				</motion.div>
			</a>
		</Link>
	);
};

export default DrawingCard;
