import ArticleCard from "@components/ArticleCard";
import PageSection from "@components/PageSection";
import TitleSection from "@components/TitleSection";
import { IImage, IPost } from "@lib/types";
import { getDatabase } from "../lib/notion";
import { getPlaiceholder } from "plaiceholder";
import css from "./blog.module.scss";

export const blogPostsDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;

interface IBlogProps {
	posts: IPost[];
}

export default function Blog({ posts }: IBlogProps) {
	return (
		<main>
			<PageSection>
				<TitleSection
					title="Articles"
					description="Sometimes I let my mind wander and decide to write
	about various topics."
				/>

				<div className={css.list}>
					{posts.map((post) => {
						return <ArticleCard post={post} key={post.id} />;
					})}
				</div>
			</PageSection>
		</main>
	);
}

export const getStaticProps = async () => {
	const blogPostsDatabase = await getDatabase(blogPostsDatabaseId);

	const extractImage = async (url: string): Promise<IImage> => {
		const { base64, img } = await getPlaiceholder(url, {
			size: 10,
		});

		return {
			...img,
			blurDataURL: base64,
		};
	};

	const formatPosts = async (post: any): Promise<IPost> => {
		const { Image, Name } = post.properties;
		const cover = await extractImage(Image.files[0].file.url);

		return {
			cover,
			id: post.id,
			path: `/article/${post.id}`,
			title: Name.title[0].plain_text,
		};
	};

	const posts = await Promise.all(blogPostsDatabase.map(formatPosts));

	return {
		props: {
			posts,
		},
		revalidate: 1,
	};
};
