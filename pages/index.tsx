import PageSection from "@components/PageSection";
import ArticleCard from "@components/ArticleCard";
import TitleSection from "@components/TitleSection";
import Gallery from "@components/Gallery";
import Button from "@components/Button";
import HomeGreetings from "@components/sections/HomeGreetings";
import AboutMe from "@components/sections/AboutMe";
import css from "./index.module.scss";
import { getDatabase } from "../lib/notion";
import { IPost, IDrawing } from "@lib/types";
import { ArrowRight } from "react-feather";
import { blogPostsDatabaseId, drawingDatabaseId } from "@lib/config";
import { formatDrawing, formatPosts } from "@lib/utils";

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

	// Potentilaly create a generic function to do that
	const drawingDatabase = (await getDatabase(drawingDatabaseId)).slice(
		0,
		maxDrawing
	);
	// Potentilaly create a generic function to do that
	const blogPostsDatabase = (await getDatabase(blogPostsDatabaseId)).slice(
		0,
		maxPost
	);

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
