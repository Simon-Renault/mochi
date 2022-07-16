import css from "./HomeGreetings.module.scss";
import Image from "next/image";
import { USER } from "@lib/config";
import cover from "@images/cover.jpg";
import { motion } from "framer-motion";
import PageSection from "@components/PageSection";

const ulVariant = {
	animate: {
		transition: {
			delayChildren: 1,
			staggerChildren: 0.18,
		},
	},
	hidden: {
		transition: {
			staggerChildren: 0.06,
			staggerDirection: -1,
		},
	},
};

const liVariant = {
	animate: {
		opacity: 1,
		y: "0%",
		transition: {
			duration: 0.65,
			ease: "easeOut",
		},
	},
	hidden: {
		opacity: 0,
		y: "100%",
		transition: {
			duration: 0.25,
			ease: "easeInOut",
		},
	},
};

export default function HomeGreetings() {
	return (
		<div className={css.section_top}>
			<PageSection className={css.greetings}>
				<p className={css.welcome}>Welcome</p>
				<p className={css.heading}>
					<span className={css.hello}>Hey, I’m {USER.FirstName}</span>
					<span className={css.divider}> — </span>
					<span className={css.intro}>
						Artist & creator who enjoys mixing nature and cities,
						with a touch of chaos.
					</span>
				</p>
			</PageSection>

			<div className={css.image_container}>
				<Image
					src={cover}
					alt="Picture of the author"
					layout="fill"
					placeholder="blur"
					quality={20}
				/>
			</div>

			<PageSection className={css.divider_container}>
				<div className={css.divider}></div>
			</PageSection>
		</div>
	);
}
