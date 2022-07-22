import css from "./Section.module.scss";
import { storyblokEditable } from "@storyblok/react";
import classNames from "classnames";
import Component from "@components/Index";
import { Border } from "@components/Border";

export default function Section({ blok }) {
	const borderTop = blok.borders.includes("top");
	const borderBottom = blok.borders.includes("bottom");
	return (
		<div {...storyblokEditable(blok)}>
			{borderTop && <Border elevated={blok.elevated} position="top" />}
			<div
				className={classNames(
					css.page_section,
					blok.elevated && css.elevated
				)}
			>
				<div className={css.inner}>
					{blok.content.map((b) => (
						<Component blok={b} key={b._uid} />
					))}
				</div>
			</div>
			{borderBottom && (
				<Border elevated={blok.elevated} position="bottom" />
			)}
		</div>
	);
}
