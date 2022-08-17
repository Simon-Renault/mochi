import Head from "next/head";
import css from "./post.module.scss";
import PageSection from "@components/PageSection";
import PageWrapper from "@components/PageWrapper";
import { GetStaticProps } from "next/types";
import {
	getStoryblokApi,
	StoryblokResult,
	StoryData,
	storyblokEditable,
	useStoryblokState,
} from "@storyblok/react";
import {
	BlogpostStoryblok,
	HomePageStoryblok,
} from "typings/components-schema";
import { render } from "storyblok-rich-text-react-renderer";
import { RELATIONS } from "@lib/utils";

interface IBlogProps {
	blogpost: StoryData<BlogpostStoryblok>;
}

export default function Post({ blogpost }: IBlogProps) {
	if (!blogpost) {
		return <div />;
	}

	blogpost = useStoryblokState(blogpost, {
		//@ts-ignore
		RELATIONS,
	});

	return (
		<PageWrapper id="article">
			<Head>
				<title>{blogpost.name}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main {...storyblokEditable(blogpost.content)}>
				<PageSection className={css.top}>
					<div className={css.artwork_title}>
						<p className={css.id}>2 march 2020</p>
						<div className={css.artwork_title_inner}>
							<h1 className={css.title}>{blogpost.name}</h1>
						</div>
					</div>
					<div className={css.banner}>
						<div className={css.image_container}>
							<img src={blogpost.content.cover?.filename} />
						</div>
					</div>
				</PageSection>

				<PageSection className={css.content}>
					<div className={css.artwork_page}>
						{render(blogpost.content.content)}
					</div>
				</PageSection>
			</main>
		</PageWrapper>
	);
}

export const getStaticPaths = async () => {
	const storyblokApi = getStoryblokApi();

	let { data }: StoryblokResult = await storyblokApi.get(`cdn/stories/home`, {
		version: "draft",
		resolve_relations: RELATIONS,
	});

	let story: StoryData<HomePageStoryblok> = data.story;

	const paths = story.content.featuredArticles.map(
		(node: StoryData<BlogpostStoryblok>) => ({
			params: { id: node.slug },
		})
	);

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { id }: any = context.params;

	const storyblokApi = getStoryblokApi();

	let { data }: StoryblokResult = await storyblokApi.get(
		`cdn/stories/blog/${id}`,
		{
			version: "draft",
			resolve_relations: RELATIONS,
		}
	);

	let story: StoryData<HomePageStoryblok> = data.story;

	return {
		props: {
			blogpost: story,
		},
	};
};
