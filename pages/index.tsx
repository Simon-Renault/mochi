import PageSection from "@components/PageSection";
import ArticleCard from "@components/ArticleCard";
import TitleSection from "@components/TitleSection";
import Gallery from "@components/Gallery";
import Button from "@components/Button";
import HomeGreetings from "@components/sections/HomeGreetings";
import AboutMe from "@components/sections/AboutMe";
import css from "./index.module.scss";
import { ArrowRight } from "react-feather";
import { Border } from "@components/Border";
import PageWrapper from "@components/PageWrapper";
import {
	getStoryblokApi,
	StoryData,
	useStoryblokState,
	storyblokEditable,
} from "@storyblok/react";
import { StoryblokResult } from "storyblok-js-client";
import {
	ArtworkStoryblok,
	BlogpostStoryblok,
	HomePageStoryblok,
} from "typings/components-schema";

const RELATIONS = ["page.featuredDrawings", "page.featuredArticles"];

interface IHomeProps {
	story: StoryData<HomePageStoryblok>;
}

export default function Home({ story }: IHomeProps) {
	//@ts-ignore
	story = useStoryblokState(story, {
		//@ts-ignore
		RELATIONS,
	});

	return (
		<PageWrapper id="index">
			<main
				className={css.container}
				{...storyblokEditable(story.content)}
			>
				<HomeGreetings />
				<PageSection className={css.section_artworks}>
					<TitleSection
						title="Featured work"
						description="A collection of my best work, carefuly curated and kept up to date by myself"
					/>
					<Gallery drawings={story.content.featuredDrawings} />
				</PageSection>
				<Border />
				<PageSection elevated={true} className={css.about}>
					<AboutMe />
				</PageSection>
				<Border isWhite />
				<PageSection>
					<div className={css.columns}>
						<div>
							<TitleSection
								title="Articles"
								description="Sometimes I let my mind wander and decide to write
	about various topics."
							/>
							<Button rounded className={css.action}>
								Explore all <ArrowRight size={16} />
							</Button>
						</div>

						<div className={css.list}>
							{story.content.featuredArticles.map(
								(post: StoryData<BlogpostStoryblok>) => {
									return (
										<ArticleCard
											post={post}
											key={post.id}
										/>
									);
								}
							)}
						</div>
						<Button
							rounded
							href="/blog"
							className={css.mobile_action}
						>
							Explore all <ArrowRight size={16} />
						</Button>
					</div>
				</PageSection>
			</main>
		</PageWrapper>
	);
}

export const getStaticProps = async () => {
	const storyblokApi = getStoryblokApi();

	let { data }: StoryblokResult = await storyblokApi.get(`cdn/stories/home`, {
		version: "draft",
		resolve_relations: RELATIONS,
	});

	let story: StoryData<HomePageStoryblok> = data.story;

	return {
		props: {
			story,
		},
		revalidate: 1,
	};
};
