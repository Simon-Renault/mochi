import React from "react";
import Link from "next/link";
import css from "./ArticleCard.module.scss";
import Image from "next/image";
import { IPost } from "@lib/types";
import { ArtworkStoryblok, BlogpostStoryblok } from "typings/components-schema";
import { StoryData } from "@storyblok/react";

interface IArticleCardProps {
	post: StoryData<BlogpostStoryblok>;
}
const ArticleCard = (props: IArticleCardProps): JSX.Element => {
	return (
		<Link href={props.post.full_slug}>
			<a>
				<div className={css.articleCard}>
					<div className={css.imageContainer}>
						{props.post.content.cover?.filename && (
							<Image
								src={props.post.content.cover?.filename}
								layout="fill"
								alt="Picture of the author"
							/>
						)}
					</div>
					<div className={css.description}>
						<p className={css.date}>Oct 24, 2021</p>
						<p className={css.title}>{props.post.name}</p>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default ArticleCard;
