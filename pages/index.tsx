import PageSection from "@components/PageSection";
import ArticleCard from "@components/ArticleCard";
import DrawingCard from "@components/DrawingCard";
import TitleSection from "@components/TitleSection";
import Gallery from "@components/Gallery";
import Button from "@components/Button";
import { getDatabase } from "../lib/notion";
import css from "./index.module.scss";
import Image from "next/image";
import cover from "@images/cover.jpg";
import { getPlaiceholder } from "plaiceholder";
import { IPost, IDrawing, IImage } from "@lib/types";
import { ArrowRight } from "react-feather";

export const drawingDatabaseId = process.env.NOTION_DRAWING_DATABASE_ID;
export const blogPostsDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;

interface IHomeProps {
	posts: IPost[];
	drawings: IDrawing[];
}

export default function Home({ posts, drawings }: IHomeProps) {
	return (
		<main className={css.container}>
			<PageSection className={css.section_top}>
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
							quality={20}
						/>
					</div>
					<div className={css.divider}></div>
				</div>
			</PageSection>
			<PageSection className={css.section_artworks}>
				<TitleSection
					title="Artworks"
					description="	Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua"
				/>
				<Gallery drawings={drawings} />
			</PageSection>
			<PageSection elevated={true}>
				<TitleSection title="About me" />
				<div className={css.about}>
					<div>
						<div className={css.about_text}>
							<p>
								Digital is a customizable Super template
								designed to help digital creators feature
								projects, writing, and more. Make Digital your
								own by changing background, text, and accent
								colors with ease.
							</p>
							<p>
								Digital is built by Matt Downey — a digital
								creator himself who is heavily involved in
								design, technology, crypto, and mindset. The
								images for all projects and articles were kindly
								licensed by Christos.
							</p>
						</div>
						<Button variant="outlined">
							Read more <ArrowRight size={16} />
						</Button>
					</div>
					<div className={css.about_image}>
						<img
							src="/images/about.png"
							width="100%"
							height="100%"
						/>
					</div>
				</div>
			</PageSection>
			<PageSection>
				<div className={css.columns}>
					<div>
						<TitleSection
							title="Articles"
							description="Sometimes I let my mind wander and decide to write
					about various topics."
						/>
						<Button>
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
	const drawingDatabase = await getDatabase(drawingDatabaseId);
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
			path: `/blog-posts/${post.id}`,
			title: Name.title[0].plain_text,
		};
	};

	const formatDrawing = async (post: any): Promise<IPost> => {
		const { Image, Name } = post.properties;
		const cover = await extractImage(Image.files[0].file.url);

		return {
			cover,
			id: post.id,
			path: `/artworks/${post.id}`,
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
