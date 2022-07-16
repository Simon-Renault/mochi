import ArticleCard from "@components/ArticleCard";
import Button from "@components/Button";
import TitleSection from "@components/TitleSection";
import { ArrowRight } from "react-feather";
import css from "./Articles.module.scss";

export default function Articles() {
	return (
		<div className={css.columns}>
			<div>
				<TitleSection
					title="Articles"
					description="Sometimes I let my mind wander and decide to write
	about various topics."
				/>
				<Button>
					Explore all <ArrowRight size={16} />
				</Button>
			</div>

			<div className={css.list}>
				{posts.map((post) => {
					return <ArticleCard post={post} key={post.id} />;
				})}
			</div>
		</div>
	);
}
