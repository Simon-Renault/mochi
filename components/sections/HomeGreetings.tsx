import css from "./HomeGreetings.module.scss";
import Image from "next/image";
import PageSection from "@components/PageSection";
import { storyblokEditable } from "@storyblok/react";

export default function HomeGreetings({ blok }) {
	return (
		<div className={css.section_top} {...storyblokEditable(blok)}>
			<PageSection className={css.greetings}>
				<p className={css.welcome}>Welcome</p>
				<p className={css.heading}>
					<span className={css.hello}>Hey, I’m {blok.name}</span>
					<span className={css.divider}> — </span>
					<span className={css.intro}>{blok.greeting}</span>
				</p>
			</PageSection>

			<div className={css.image_container}>
				<Image
					src={blok.cover.filename}
					alt="Picture of the author"
					layout="fill"
					quality={20}
				/>
			</div>

			<PageSection className={css.divider_container}>
				<div className={css.divider}></div>
			</PageSection>
		</div>
	);
}
