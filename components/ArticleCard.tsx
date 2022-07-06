import React from "react";
import Link from "next/link";
import css from "./ArticleCard.module.scss";
import Image from "next/image";
import { IPost } from "@lib/types";

interface IArticleCardProps {
	post: IPost;
}

const ArticleCard = (props: IArticleCardProps): JSX.Element => {
	const { cover, path } = props.post;
	return (
		<Link href={path}>
			<a>
				<div className={css.articleCard}>
					<div className={css.imageContainer}>
						<Image
							{...cover}
							layout="fill"
							alt="Picture of the author"
							placeholder="blur"
						/>
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
