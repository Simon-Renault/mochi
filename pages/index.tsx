import PageSection from "@components/PageSection";
import ArticleCard from "@components/ArticleCard";
import DrawingCard from "@components/DrawingCard";
import { getDatabase } from "../lib/notion";
import css from "./index.module.scss";
import Image from "next/image";
import cover from "@images/cover.jpg";

export const drawingDatabaseId = process.env.NOTION_DRAWING_DATABASE_ID;
export const blogPostsDatabaseId = process.env.NOTION_BLOG_DATABASE_ID;

export default function Home({ posts, drawings }) {
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
				<div className={css.title_section}>
					<h2>Artworks</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua
					</p>
				</div>
				<div className={css.gallery}>
					{drawings.map((drawing) => {
						const { Name, Image } = drawing.properties;
						const title = Name.title[0].plain_text;
						const image = {
							url: Image.files[0].file.url,
						};
						return (
							<DrawingCard
								key={drawing.id}
								path={`/artworks/${drawing.id}`}
								title={title}
								image={image}
							/>
						);
					})}
				</div>
			</PageSection>
			<PageSection elevated={true}>
				<div className={css.title_section}>
					<h2>About me</h2>
				</div>
			</PageSection>
			<PageSection>
				<div className={css.test}>
					<div className={css.title_section}>
						<h2>Articles</h2>
						<p>
							Sometimes I let my mind wander and decide to write
							about various topics.
						</p>
					</div>
					<div className={css.list}>
						{posts.map((post) => {
							const date = new Date(
								post.last_edited_time
							).toLocaleString("en-US", {
								month: "short",
								day: "2-digit",
								year: "numeric",
							});
							return (
								<ArticleCard
									key={post.id}
									path={`/blog-posts/${post.id}`}
									title={""}
									image={{
										url: post.properties.Image.files[0].file
											.url,
									}}
								/>
							);
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

	return {
		props: {
			drawings: drawingDatabase,
			posts: blogPostsDatabase,
		},
		revalidate: 1,
	};
};
