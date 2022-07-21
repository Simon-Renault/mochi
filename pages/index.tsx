import PageSection from "@components/PageSection";
import ArticleCard from "@components/ArticleCard";
import TitleSection from "@components/TitleSection";
import Gallery from "@components/Gallery";
import Button from "@components/Button";
import HomeGreetings from "@components/sections/HomeGreetings";
import AboutMe from "@components/sections/AboutMe";
import css from "./index.module.scss";
import { getDatabase } from "../lib/notion";
import { IPost, IDrawing, IImage } from "@lib/types";
import { ArrowRight } from "react-feather";
import { blogPostsDatabaseId } from "@lib/config";
import { formatPosts } from "@lib/utils";
import { getProducts } from "@lib/shopifyClient";
import { Border } from "@components/Border";
import PageWrapper from "@components/PageWrapper";

interface IHomeProps {
	posts: IPost[];
	drawings: IDrawing[];
}

export default function Home({ posts, drawings }: IHomeProps) {
	return (
		<PageWrapper key="index">
			<main className={css.container}>
				<HomeGreetings />
				<PageSection className={css.section_artworks}>
					<TitleSection
						title="Featured work"
						description="A collection of my best work, carefuly curated and kept up to date by myself"
					/>
					<Gallery drawings={drawings} />
				</PageSection>
				<Border />
				<PageSection elevated={true} className={css.about}>
					<AboutMe />
				</PageSection>
				<Border isWhite />
				<PageSection>
					<div className={css.columns}>
						<div>
							<TitleSection
								title="Articles"
								description="Sometimes I let my mind wander and decide to write
	about various topics."
							/>
							<Button rounded className={css.action}>
								Explore all <ArrowRight size={16} />
							</Button>
						</div>

						<div className={css.list}>
							{posts.map((post) => {
								return (
									<ArticleCard post={post} key={post.id} />
								);
							})}
						</div>
						<Button
							rounded
							href="/blog"
							className={css.mobile_action}
						>
							Explore all <ArrowRight size={16} />
						</Button>
					</div>
				</PageSection>
			</main>
		</PageWrapper>
	);
}

export const getStaticProps = async () => {
	const maxPost = 3;

	// Potentilaly create a generic function to do that
	const blogPostsDatabase = (await getDatabase(blogPostsDatabaseId)).slice(
		0,
		maxPost
	);

	const posts = await Promise.all(blogPostsDatabase.map(formatPosts));
	const products = await getProducts();

	const getImage = ({ node }: any): IImage => {
		return {
			src: node.url,
			altText: node.altText,
			width: node.width,
			height: node.height,
		};
	};

	const getImages = (data: any): IImage[] => {
		return data.edges.map(getImage);
	};

	const drawings = products.products.edges.map(({ node }: any): IDrawing => {
		return {
			cover: getImages(node.images)[0],
			title: node.title,
			id: node.id,
			path: `artwork/${node.handle}`,
			minPrice: node.priceRange.minVariantPrice.amount,
			maxPrice: node.priceRange.maxVariantPrice.amount,
			description: node.description,
			descriptionHtml: node.descriptionHtml,
		};
	});

	return {
		props: {
			drawings,
			posts,
			products,
		},
		revalidate: 1,
	};
};
