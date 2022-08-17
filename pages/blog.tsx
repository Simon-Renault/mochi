import ArticleCard from "@components/ArticleCard";
import PageSection from "@components/PageSection";
import TitleSection from "@components/TitleSection";
import css from "./blog.module.scss";
import PageWrapper from "@components/PageWrapper";
import { getStoryblokApi, StoryblokResult, StoryData } from "@storyblok/react";
import { BlogpostStoryblok } from "typings/components-schema";
import { RELATIONS } from "@lib/utils";

interface IBlogProps {
	posts: StoryData<BlogpostStoryblok>[];
}

export default function Blog({ posts }: IBlogProps) {
	if (!posts) return <div></div>;
	return (
		<PageWrapper id="blog">
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
	const storyblokApi = getStoryblokApi();

	let { data }: StoryblokResult = await storyblokApi.get(`cdn/stories`, {
		starts_with: "blog/",
		version: "draft",
		resolve_relations: RELATIONS,
	});

	let stories: StoryData<BlogpostStoryblok>[] = data.stories;

	return {
		props: {
			posts: stories,
		},
		revalidate: 1,
	};
};
