import css from "./HomeGreetings.module.scss";
import Image from "next/image";
import PageSection from "@components/PageSection";
import { myLoader } from "@lib/utils";

interface IHomeGreetingsProps {
	name?: string;
	greetings?: string;
	cover?: string;
}

export default function HomeGreetings({
	name,
	greetings,
	cover,
}: IHomeGreetingsProps) {
	return (
		<div className={css.section_top}>
			<PageSection className={css.greetings}>
				<p className={css.welcome}>Welcome</p>
				<p className={css.heading}>
					<span className={css.hello}>Hey, I’m {name}</span>
					<span className={css.divider}> — </span>
					<span className={css.intro}>{greetings}</span>
				</p>
			</PageSection>

			<div className={css.image_container}>
				<Image
					loader={myLoader}
					src={cover}
					alt="Picture of the author"
					layout="fill"
					quality={1}
				/>
			</div>

			<PageSection className={css.divider_container}>
				<div className={css.divider}></div>
			</PageSection>
		</div>
	);
}
