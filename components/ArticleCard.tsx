import React from "react";
import Link from "next/link";
import css from "./ArticleCard.module.scss";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";

const ArticleCard = ({ blok }): JSX.Element => {
	const { article } = blok;
	if (!article) return <div>no article</div>;
	return (
		<Link href={"/"}>
			<a {...storyblokEditable(blok)}>
				<div className={css.articleCard}>
					<div className={css.imageContainer}>
						<Image
							src={article.content.cover.filename}
							layout="fill"
							alt="Picture of the author"
						/>
					</div>
					<div className={css.description}>
						<p className={css.date}>Oct 24, 2021</p>
						<p className={css.title}>{article.name}</p>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default ArticleCard;
