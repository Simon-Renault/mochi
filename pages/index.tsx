import css from "./index.module.scss";
import PageWrapper from "@components/PageWrapper";

import {
	getStoryblokApi,
	StoryblokComponent,
	useStoryblokState,
} from "@storyblok/react";
import { StoryblokResult } from "storyblok-js-client";

interface IHomeProps {
	story: any;
}

export default function Home({ story }: IHomeProps) {
	story = useStoryblokState(story, {
		resolveRelations: ["article_card.article", "gallery.drawings"],
	});
	console.log(story);
	return (
		<PageWrapper _key="index">
			<main className={css.container}>
				<StoryblokComponent blok={story.content} />
			</main>
		</PageWrapper>
	);
}

export const getStaticProps = async () => {
	const storyblokApi = getStoryblokApi();

	let { data }: StoryblokResult = await storyblokApi.get(`cdn/stories/home`, {
		version: "draft", // or 'published'
		resolve_relations: ["article_card.article", "gallery.drawings"],
	});

	return {
		props: {
			story: data.story,
		},
		revalidate: 1,
	};
};
