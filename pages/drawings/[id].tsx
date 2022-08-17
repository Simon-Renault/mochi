import Head from "next/head";
import PageSection from "@components/PageSection";
import BuySection, { IVariant } from "@components/shop/BuySection";
import css from "./artworks.module.scss";
import { GetStaticProps } from "next/types";
import Image from "next/image";
import PageWrapper from "@components/PageWrapper";
import { TextContainer } from "@components/TextContainer";
import {
	getStoryblokApi,
	StoryblokResult,
	StoryData,
	storyblokEditable,
	useStoryblokState,
} from "@storyblok/react";
import { ArtworkStoryblok, HomePageStoryblok } from "typings/components-schema";
import { render } from "storyblok-rich-text-react-renderer";
import { RELATIONS } from "@lib/utils";

interface IPostProps {
	artwork: StoryData<ArtworkStoryblok>;
}

export default function Post({ artwork }: IPostProps) {
	if (!artwork) return <div />;
	const { slug } = artwork;

	artwork = useStoryblokState(artwork, {
		//@ts-ignore
		RELATIONS,
	});

	const original: IVariant = {
		name: "Original",
		price: artwork.content.originalPrice,
		isSelling: artwork.content.isOriginalForSale,
	};

	const prints: IVariant[] = [
		{
			name: "Small",
			price: artwork.content.smallPrice,
			isSelling: true,
			slug,
		},
		{
			name: "Medium",
			price: artwork.content.mediumPrice,
			isSelling: true,
			slug,
		},
		{
			name: "Large",
			price: artwork.content.largePrice,
			isSelling: artwork.content.largeQuantityLeft
				? artwork.content.largeQuantityLeft > 0
				: false,
			slug,
		},
	];

	return (
		<PageWrapper id="artwork">
			<Head>
				<title>{artwork.name}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main {...storyblokEditable(artwork.content)}>
				<div className={css.top}>
					<div className={css.artwork_title}>
						<p className={css.id}>01 - 10</p>
						<div className={css.artwork_title_inner}>
							<h1 className={css.title}>{artwork.name}</h1>
							<p className={css.date}>2020</p>
						</div>
					</div>
					{artwork.content.cover && (
						<div className={css.banner}>
							<div className={css.image_container}>
								<Image
									src={artwork.content.cover?.filename}
									alt={artwork.content.cover?.alt}
									width={900}
									height={800}
									quality={10}
								/>
								<img />
							</div>
						</div>
					)}
				</div>

				<PageSection className={css.content}>
					<div className={css.artwork_page}>
						{artwork.content.text && (
							<TextContainer>
								<div>{render(artwork.content.text)}</div>
							</TextContainer>
						)}

						<div className={css.sidebar}>
							<BuySection
								artwork={artwork}
								original={original}
								prints={prints}
							/>
						</div>
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

	const paths = story.content.featuredDrawings.map(
		(node: StoryData<ArtworkStoryblok>) => ({
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
		`cdn/stories/drawings/${id}`,
		{
			version: "draft",
			resolve_relations: RELATIONS,
		}
	);

	let story: StoryData<HomePageStoryblok> = data.story;

	return {
		props: {
			artwork: story,
		},
	};
};
