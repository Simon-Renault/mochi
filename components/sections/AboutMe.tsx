import Button from "@components/Button";
import TitleSection from "@components/TitleSection";
import { ArrowRight } from "react-feather";
import css from "./AboutMe.module.scss";
import { storyblokEditable } from "@storyblok/react";

export default function AboutMe({ blok }) {
	return (
		<div {...storyblokEditable(blok)}>
			<TitleSection title="About me" />
			<div className={css.about}>
				<div className={css.about_container}>
					{blok.text && (
						<div className={css.about_text}>{blok.text}</div>
					)}
					<div className={css.about_image}>
						<img
							src="/images/about.png"
							width="100%"
							height="100%"
						/>
					</div>
				</div>
				<Button outlined rounded href="/about">
					Read more <ArrowRight size={16} />
				</Button>
			</div>
		</div>
	);
}
