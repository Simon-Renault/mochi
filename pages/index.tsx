import PageSection from "@components/PageSection";
import TitleSection from "@components/TitleSection";
import Button from "@components/Button";
import css from "./index.module.scss";
import { ArrowRight } from "react-feather";
import PageWrapper from "@components/PageWrapper";

import {
	getStoryblokApi,
	StoryblokComponent,
	useStoryblokState,
} from "@storyblok/react";
import { StoryblokResult } from "storyblok-js-client";

interface IHomeProps {
	story: any;
	key: any;
}

export default function Home({ story }: IHomeProps) {
	story = useStoryblokState(story, {
		resolveRelations: ["article_card.article", "gallery.drawings"],
	});
	return (
		<PageWrapper _key="index">
			<main className={css.container}>
				<StoryblokComponent blok={story.content} />

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
							{/* {articles.data.stories.map((post) => {
								return (
									<ArticleCard blok={post} key={post._uid} />
								);
							})} */}
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
	let slug = "home";

	// load the draft version
	let sbParams = {
		version: "draft", // or 'published'
		resolve_relations: ["article_card.article", "gallery.drawings"],
	};

	const storyblokApi = getStoryblokApi();

	let { data }: StoryblokResult = await storyblokApi.get(
		`cdn/stories/${slug}`,
		sbParams
	);
	let articles = await storyblokApi.get("cdn/stories", {
		starts_with: "blog/",
		version: "draft",
	});

	return {
		props: {
			articles,
			story: data ? data.story : false,
			key: data ? data.story.id : false,
		},
		revalidate: 1,
	};
};
