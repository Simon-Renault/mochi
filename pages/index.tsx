import PageSection from "@components/PageSection";
import ArticleCard from "@components/ArticleCard";
import DrawingCard from "@components/DrawingCard";
import TitleSection from "@components/TitleSection";
import { getDatabase } from "../lib/notion";
import css from "./index.module.scss";
import Image from "next/image";
import cover from "@images/cover.jpg";
import { getPlaiceholder } from "plaiceholder";
import { IPost, IDrawing, IImage } from "@lib/types";

export const drawingDatabaseId = process.env.NOTION_DRAWING_DATABASE_ID;
export const blogPostsDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;

interface IHomeProps {
	posts: IPost[];
	drawings: IDrawing[];
}

export default function Home({ posts, drawings }: IHomeProps) {
	return (
		<main className={css.container}>
			<PageSection className={css.top}>
				<div className={css.greetings}>
					<p className={css.welcome}>Welcome</p>
					<p className={css.heading}>
						Hey, I’m Simon — Artist & creator who enjoys mixing
						nature and cities, with a touch of chaos.
					</p>
					<div className={css.image_container}>
						<Image
							src={cover}
							alt="Picture of the author"
							layout="fill"
							placeholder="blur"
						/>
					</div>
					<div className={css.divider}></div>
				</div>
			</PageSection>
			<PageSection>
				<TitleSection
					title="Artworks"
					description="	Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua"
				/>
				<div className={css.gallery}>
					{drawings.map((drawing) => {
						return (
							<DrawingCard drawing={drawing} key={drawing.id} />
						);
					})}
				</div>
			</PageSection>
			<PageSection elevated={true}>
				<TitleSection title="About me" />
			</PageSection>
			<PageSection>
				<div className={css.test}>
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
				</div>
			</PageSection>
			<PageSection elevated={true}></PageSection>
		</main>
	);
}

export const getStaticProps = async () => {
	const drawingDatabase = await getDatabase(drawingDatabaseId);
	const blogPostsDatabase = await getDatabase(blogPostsDatabaseId);

	const extractImage = async (url: string): Promise<IImage> => {
		const { base64, img } = await getPlaiceholder(url, {
			size: 10,
		});
		console.log(img);

		return {
			...img,
			blurDataURL: base64,
		};
	};

	const formatPosts = async (post: any): Promise<IPost> => {
		const { Image } = post.properties;
		const cover = await extractImage(Image.files[0].file.url);

		return {
			cover,
			id: post.id,
			path: `/blog-posts/${post.id}`,
			title: "",
		};
	};

	const formatDrawing = async (post: any): Promise<IPost> => {
		const { Image } = post.properties;
		const cover = await extractImage(Image.files[0].file.url);

		return {
			cover,
			id: post.id,
			path: `/artworks/${post.id}`,
			title: "",
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
