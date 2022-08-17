import css from "./Section.module.scss";
import { storyblokEditable, StoryData } from "@storyblok/react";
import classNames from "classnames";
import Component from "@components/Index";
import { Border } from "@components/Border";
import { SectionStoryblok } from "typings/components-schema";
import TitleSection from "@components/TitleSection";

interface ISectionProps {
	blok: SectionStoryblok;
}

export default function Section({ blok }: ISectionProps) {
	const borderTop = blok.borders && blok.borders.includes("top");
	const borderBottom = blok.borders && blok.borders.includes("bottom");
	const elevated = blok.elevated || false;
	return (
		<div {...storyblokEditable(blok)}>
			{borderTop && <Border elevated={elevated} position="top" />}
			<div
				className={classNames(
					css.page_section,
					elevated && css.elevated,
					borderTop && css.border_top,
					borderBottom && css.border_bottom
				)}
			>
				<div className={css.inner}>
					<TitleSection
						description={blok.description}
						title={blok.title}
					/>
					{blok.content &&
						blok.content.map((b) => (
							<Component blok={b} key={b._uid} />
						))}
				</div>
			</div>
			{borderBottom && <Border elevated={elevated} position="bottom" />}
		</div>
	);
}
