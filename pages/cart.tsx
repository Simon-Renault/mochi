import Button from "@components/Button";
import { addProductToCart } from "@lib/helper";
import { Context } from "@lib/shopContext";
import { useContext } from "react";
import Router from "next/router";
import PageWrapper from "@components/PageWrapper";
import css from "./cart.module.scss";
import { getStoryblokApi, StoryblokResult, StoryData } from "@storyblok/react";
import { myLoader, RELATIONS } from "@lib/utils";
import { HomePageStoryblok } from "typings/components-schema";
import { IVariant } from "@components/shop/BuySection";
import Image from "next/image";
import TitleSection from "@components/TitleSection";
import PageSection from "@components/PageSection";

interface ICartProps {
	stories: StoryData<HomePageStoryblok>[];
}
export default function Blog({ stories }: ICartProps) {
	const { cartID, cartItems } = useContext(Context);

	console.log(stories);

	const handleClick = async () => {
		let data = await addProductToCart(
			cartItems.map((x: any) => {
				return { quantity: 1, variantId: x.id };
			})
		);
		Router.push(data.webUrl);
	};

	return (
		<PageWrapper id="cart">
			<main>
				<PageSection className={css.content}>
					<TitleSection
						title="Basket"
						description="All the artworks you intend to buy"
					/>
					<ul className={css.list}>
						{cartItems.map((item: IVariant) => {
							const drawing = stories.find((story) => {
								return story.slug === item.slug;
							});
							return (
								<li className={css.item} key={item.name}>
									<Image
										loader={myLoader}
										src={drawing.content.cover?.filename}
										width={150}
										height={150}
										alt="Picture of the author"
									/>
									<div>Name : {drawing?.name}</div>
									<div>Size : {item.name}</div>
									<div>Price : {item.price}</div>
								</li>
							);
						})}
					</ul>
					<Button onClick={handleClick}>Checkout</Button>
				</PageSection>
			</main>
		</PageWrapper>
	);
}

export const getStaticProps = async () => {
	const storyblokApi = getStoryblokApi();

	let { data }: StoryblokResult = await storyblokApi.get(`cdn/stories`, {
		starts_with: "drawings/",
		version: "draft",
		resolve_relations: RELATIONS,
	});

	let stories: StoryData<HomePageStoryblok>[] = data.stories;

	return {
		props: {
			stories,
		},
		revalidate: 1,
	};
};
