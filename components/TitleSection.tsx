import { FC } from "react";
import css from "./TitleSection.module.scss";

interface ITitleSectionProps {
	title?: string;
	description?: string;
}

const Head: FC<ITitleSectionProps> = ({ title, description }) => {
	return (
		<div className={css.title_section}>
			{title && <h2>{title}</h2>}
			{description && <p>{description}</p>}
		</div>
	);
};

export default Head;
