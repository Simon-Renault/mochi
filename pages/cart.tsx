import Button from "@components/Button";
import { addProductToCart } from "@lib/helper";
import { Context } from "@lib/shopContext";
import { useContext } from "react";
import Router from "next/router";
import { IVariant } from "@lib/types";
import PageWrapper from "@components/PageWrapper";

export default function Blog() {
	const { cartID, cartItems } = useContext(Context);

	const handleClick = async () => {
		let data = await addProductToCart(
			cartItems.map((x: any) => {
				return { quantity: 1, variantId: x.id };
			})
		);
		Router.push(data.webUrl);
	};

	return (
		<PageWrapper _key="cart">
			<main>
				<div>
					{cartItems.map((item: IVariant) => {
						return <li key={item.id}>{JSON.stringify(item)}</li>;
					})}
				</div>
				<Button onClick={handleClick}>Checkout</Button>
			</main>
		</PageWrapper>
	);
}

export const getStaticProps = async () => {
	return {
		props: {},
		revalidate: 1,
	};
};
