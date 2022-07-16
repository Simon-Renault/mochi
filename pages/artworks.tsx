import ArticleCard from "@components/ArticleCard";
import PageSection from "@components/PageSection";
import TitleSection from "@components/TitleSection";
import { IDrawing, IImage } from "@lib/types";
import { getDatabase } from "../lib/notion";
import { getPlaiceholder } from "plaiceholder";
import css from "./artworks.module.scss";
import Gallery from "@components/Gallery";

export const drawingDatabaseId = process.env.NOTION_DRAWING_DATABASE_ID;

interface IArtworkProps {
	drawings: IDrawing[];
}

export default function Blog({ drawings }: IArtworkProps) {
	return (
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
	);
}

export const getStaticProps = async () => {
	const drawingDatabase = await getDatabase(drawingDatabaseId);

	const extractImage = async (url: string): Promise<IImage> => {
		const { base64, img } = await getPlaiceholder(url, {
			size: 10,
		});

		return {
			...img,
			blurDataURL: base64,
		};
	};

	const formatDrawing = async (drawing: any): Promise<IDrawing> => {
		const { Image, Name } = drawing.properties;
		const cover = await extractImage(Image.files[0].file.url);

		return {
			cover,
			id: drawing.id,
			path: `/artworks/${drawing.id}`,
			title: Name.title[0].plain_text,
		};
	};

	const drawings = await Promise.all(drawingDatabase.map(formatDrawing));

	return {
		props: {
			drawings,
		},
		revalidate: 1,
	};
};
