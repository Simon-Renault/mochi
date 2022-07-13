import { IDrawing } from "@lib/types";
import DrawingCard from "./DrawingCard";
import css from "./Gallery.module.scss";

interface IGalleryProps {
	drawings: IDrawing[];
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
		</div>
	);
}
