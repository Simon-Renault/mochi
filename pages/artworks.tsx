import PageSection from "@components/PageSection";
import TitleSection from "@components/TitleSection";
import { IDrawing } from "@lib/types";
import { getDatabase } from "../lib/notion";
import Gallery from "@components/Gallery";
import { drawingDatabaseId } from "@lib/config";
import { formatDrawing } from "@lib/utils";
import PageWrapper from "@components/PageWrapper";

interface IArtworkProps {
	drawings: IDrawing[];
}

export default function Blog({ drawings }: IArtworkProps) {
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
	const drawingDatabase = await getDatabase(drawingDatabaseId);

	// Potentilaly create a generic function to do that
	const drawings = await Promise.all(drawingDatabase.map(formatDrawing));

	return {
		props: {
			drawings,
		},
		revalidate: 1,
	};
};
