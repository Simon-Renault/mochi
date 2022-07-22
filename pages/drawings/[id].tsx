import Head from "next/head";
import PageSection from "@components/PageSection";
import BuySection from "@components/shop/BuySection";
import css from "./artworks.module.scss";
import { GetStaticProps } from "next/types";
import Image from "next/image";
import PageWrapper from "@components/PageWrapper";

import { render } from "storyblok-rich-text-react-renderer";

import {
	getStoryblokApi,
	StoryblokComponent,
	useStoryblokState,
} from "@storyblok/react";
import { StoryblokResult } from "storyblok-js-client";
import { TextContainer } from "@components/TextContainer";
import ArticleCard from "@components/ArticleCard";

export default function Post({ story }) {
	story = useStoryblokState(story, {
		resolveRelations: ["article_card.article", "gallery.drawings"],
	});

	if (!story) return <div />;

	return (
		<PageWrapper _key="artwork">
			<Head>
				<title>{story.name}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div className={css.top}>
					<div className={css.artwork_title}>
						<p className={css.id}>01 - 10</p>
						<div className={css.artwork_title_inner}>
							<h1 className={css.title}>{story.name}</h1>
							<p className={css.date}>2020</p>
						</div>
					</div>
					<div className={css.banner}>
						<div className={css.image_container}>
							{story.content && (
								<Image
									src={story.content.cover.filename}
									layout="fill"
									quality={10}
								/>
							)}
						</div>
					</div>
				</div>

				<PageSection className={css.content}>
					<div className={css.artwork_page}>
						{story.content && (
							<TextContainer>
								{render(story.content.text, {
									blokResolvers: {
										article_card: (blok) => (
											<ArticleCard blok={blok} />
										),
									},
								})}
							</TextContainer>
						)}
						<div className={css.sidebar}>
							{/* <BuySection original={original} prints={prints} /> */}
						</div>
					</div>
				</PageSection>
			</main>
		</PageWrapper>
	);
}

let sbParams = {
	version: "draft",
	resolve_relations: ["article_card.article", "gallery.drawings"],
};

const storyblokApi = getStoryblokApi();

export const getStaticPaths = async () => {
	let { data } = await storyblokApi.get("cdn/stories", {
		starts_with: "blog/",
		...sbParams,
	});

	const paths = data.stories.map((story: any) => ({
		params: { id: story?.slug },
	}));

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { id }: any = context.params;

	let { data }: StoryblokResult = await storyblokApi.get(
		`cdn/stories/drawings/${id}`,
		sbParams
	);

	return {
		props: {
			story: data.story,
		},
		revalidate: 1,
	};
};
