import React from "react";
import Link from "next/link";
import css from "./ArticleCard.module.scss";

interface IArticleCardProps {
	path: string;
	image: {
		url: string;
		alt?: string;
	};
	title: string;
	date?: string;
}

const ArticleCard = (props: IArticleCardProps): JSX.Element => {
	const { image, title, path } = props;
	return (
		<Link href={path}>
			<a>
				<div className={css.articleCard}>
					<div className={css.imageContainer}>
						<img src={image.url} width="100%" alt="" />
					</div>
					<div className={css.description}>
						<p className={css.date}>Oct 24, 2021</p>
						<p className={css.title}>
							Lorem ipsum dolor sit amet, consectetur.
						</p>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default ArticleCard;
