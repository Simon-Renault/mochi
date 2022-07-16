import PageSection from "@components/PageSection";
import ArticleCard from "@components/ArticleCard";
import TitleSection from "@components/TitleSection";
import Gallery from "@components/Gallery";
import Button from "@components/Button";
import css from "./index.module.scss";
import { getDatabase } from "../lib/notion";
import { getPlaiceholder } from "plaiceholder";
import { IPost, IDrawing, IImage } from "@lib/types";
import { ArrowRight } from "react-feather";
import HomeGreetings from "@components/sections/HomeGreetings";
import AboutMe from "@components/sections/AboutMe";
import Articles from "@components/sections/Articles";

export const drawingDatabaseId = process.env.NOTION_DRAWING_DATABASE_ID;
export const blogPostsDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;

interface IHomeProps {
	posts: IPost[];
	drawings: IDrawing[];
}

export default function Home({ posts, drawings }: IHomeProps) {
	return (
		<main className={css.container}>
			<HomeGreetings />
			<PageSection className={css.section_artworks}>
				<TitleSection
					title="Featured work"
					description="A collection of my best work, carefuly curated and kept up to date by myself"
				/>
				<Gallery drawings={drawings} />
			</PageSection>
			<PageSection elevated={true}>
				<AboutMe />
			</PageSection>
			<PageSection>
				<div className={css.columns}>
					<div>
						<TitleSection
							title="Articles"
							description="Sometimes I let my mind wander and decide to write
	about various topics."
						/>
						<Button rounded>
							Explore all <ArrowRight size={16} />
						</Button>
					</div>

					<div className={css.list}>
						{posts.map((post) => {
							return <ArticleCard post={post} key={post.id} />;
						})}
					</div>
				</div>
			</PageSection>
		</main>
	);
}

export const getStaticProps = async () => {
	const maxPost = 3;
	const maxDrawing = 8;

	const drawingDatabase = await (
		await getDatabase(drawingDatabaseId)
	).slice(0, maxDrawing);
	const blogPostsDatabase = await (
		await getDatabase(blogPostsDatabaseId)
	).slice(0, maxPost);

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
			path: `/blog-posts/${post.id}`,
			title: Name.title[0].plain_text,
		};
	};

	const formatDrawing = async (drawing: any): Promise<IDrawing> => {
		const { Image, Name } = drawing.properties;
		const cover = await extractImage(Image.files[0].file.url);

		return {
			cover,
			id: drawing.id,
			path: `/artworks/${drawing.id}`,
			title: Name.title[0].plain_text,
		};
	};

	const drawings = await Promise.all(drawingDatabase.map(formatDrawing));
	const posts = await Promise.all(blogPostsDatabase.map(formatPosts));

	return {
		props: {
			drawings,
			posts,
		},
		revalidate: 1,
	};
};
