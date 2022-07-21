import ArticleCard from "@components/ArticleCard";
import PageSection from "@components/PageSection";
import TitleSection from "@components/TitleSection";
import { IPost } from "@lib/types";
import { getDatabase } from "../lib/notion";
import css from "./blog.module.scss";
import { formatPosts } from "@lib/utils";
import { blogPostsDatabaseId } from "@lib/config";
import PageWrapper from "@components/PageWrapper";

interface IBlogProps {
	posts: IPost[];
}

export default function Blog({ posts }: IBlogProps) {
	return (
		<PageWrapper key="blog">
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
		</PageWrapper>
	);
}

export const getStaticProps = async () => {
	const blogPostsDatabase = await getDatabase(blogPostsDatabaseId);

	// Potentilaly create a generic function to do that
	const posts = await Promise.all(blogPostsDatabase.map(formatPosts));

	return {
		props: {
			posts,
		},
		revalidate: 1,
	};
};
