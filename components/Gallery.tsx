import { ArrowRight } from "react-feather";
import Button from "./Button";
import css from "./Gallery.module.scss";
import { storyblokEditable } from "@storyblok/react";
import DrawingCard from "./DrawingCard";

export default function Gallery({ blok }) {
	return (
		<div className={css.gallery} {...storyblokEditable(blok)}>
			{blok.drawings.map((drawing) => {
				return (
					<DrawingCard
						blok={drawing}
						key={drawing.uuid}
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
