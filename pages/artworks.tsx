import PageSection from "@components/PageSection";
import TitleSection from "@components/TitleSection";
import Gallery from "@components/Gallery";
import PageWrapper from "@components/PageWrapper";
import { getStoryblokApi, StoryblokResult, StoryData } from "@storyblok/react";
import { ArtworkStoryblok, HomePageStoryblok } from "typings/components-schema";
import { RELATIONS } from "@lib/utils";

interface IArtworkProps {
	drawings: StoryData<ArtworkStoryblok>[];
}

export default function Blog({ drawings }: IArtworkProps) {
	if (!drawings) return <div></div>;
	return (
		<PageWrapper id="artworks">
			<main>
				<PageSection>
					<TitleSection
						title="Gallery"
						description="Sometimes I let my mind wander and decide to write
	about various topics."
					/>

					<Gallery drawings={drawings} />
				</PageSection>
			</main>
		</PageWrapper>
	);
}

export const getStaticProps = async () => {
	const storyblokApi = getStoryblokApi();

	let { data }: StoryblokResult = await storyblokApi.get(`cdn/stories`, {
		starts_with: "drawings/",
		version: "draft",
		resolve_relations: RELATIONS,
	});

	let stories: StoryData<ArtworkStoryblok>[] = data.stories;

	return {
		props: {
			drawings: stories,
		},
		revalidate: 1,
	};
};
