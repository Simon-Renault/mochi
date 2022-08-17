import React from "react";
import Link from "next/link";
import css from "./ArticleCard.module.scss";
import Image from "next/image";
import { BlogpostStoryblok } from "typings/components-schema";
import { StoryData } from "@storyblok/react";
import { myLoader } from "@lib/utils";

interface IArticleCardProps {
	post: StoryData<BlogpostStoryblok>;
}
const ArticleCard = ({ post }: IArticleCardProps): JSX.Element => {
	if (!post || !post.content) return <div>No Article</div>;
	return (
		<Link href={post.full_slug}>
			<a>
				<div className={css.articleCard}>
					<div className={css.imageContainer}>
						{post.content.cover?.filename && (
							<Image
								loader={myLoader}
								src={post.content.cover?.filename}
								layout="fill"
								alt="Picture of the author"
							/>
						)}
					</div>
					<div className={css.description}>
						<p className={css.date}>Oct 24, 2021</p>
						<p className={css.title}>{post.name}</p>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default ArticleCard;
