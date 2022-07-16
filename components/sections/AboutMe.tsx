import Button from "@components/Button";
import TitleSection from "@components/TitleSection";
import { ArrowRight } from "react-feather";
import css from "./AboutMe.module.scss";

export default function AboutMe() {
	return (
		<>
			<TitleSection title="About me" />
			<div className={css.about}>
				<div className={css.about_container}>
					<div className={css.about_text}>
						<p>
							Living in the bustling city of London (UK), I have
							always been curious and attentive to the world
							around me. Drawing has become a way for me to escape
							daily life, let my mind wander and create world of
							it’s own.
						</p>
						<p>
							Currently passionate about the relationship between
							mankind and nature, I often draw intricate
							cityscapes where luxurious vegetation meets
							architecture. Inspired from my many trips across
							Europe or Japan, I like to mix different
							architecture styles, cultures and languages.
						</p>
					</div>
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
		</>
	);
}
