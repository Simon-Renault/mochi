import { IDrawing } from "@lib/types";
import { StoryData } from "@storyblok/react";
import { ArrowRight } from "react-feather";
import { ArtworkStoryblok } from "typings/components-schema";
import Button from "./Button";
import DrawingCard from "./DrawingCard";
import css from "./Gallery.module.scss";

interface IGalleryProps {
	drawings: StoryData<ArtworkStoryblok>[];
}

export default function Gallery({ drawings }: IGalleryProps) {
	return (
		<div className={css.gallery}>
			{drawings.map((drawing) => {
				return (
					<DrawingCard
						drawing={drawing}
						key={drawing.id}
						className={css.gallery_card}
					/>
				);
			})}
			<Button className={css.view_all} rounded>
				More artworks <ArrowRight size={16} />
			</Button>
		</div>
	);
}
