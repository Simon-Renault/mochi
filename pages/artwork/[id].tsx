import Head from "next/head";
import PageSection from "@components/PageSection";
import BuySection from "@components/shop/BuySection";
import css from "./artworks.module.scss";
import { getProduct, getProducts, getVariants } from "@lib/shopifyClient";
import { IDrawing, IImage, IVariant } from "@lib/types";
import { GetStaticProps } from "next/types";
import Image from "next/image";

interface IPostProps {
	drawing: IDrawing;
	variants: {
		original: IVariant;
		prints: IVariant[];
	};
}
export default function Post({ drawing, variants }: IPostProps) {
	if (!drawing) return <div />;
	const { original, prints } = variants;
	return (
		<>
			<Head>
				<title>{drawing.title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<PageSection className={css.top}>
					<div className={css.artwork_title}>
						<p className={css.id}>01 - 10</p>
						<div className={css.artwork_title_inner}>
							<h1 className={css.title}>{drawing.title}</h1>
							<p className={css.date}>2020</p>
						</div>
					</div>
					<div className={css.banner}>
						<div className={css.image_container}>
							<Image
								src={drawing.cover.src}
								alt={drawing.cover.altText}
								width={drawing.cover.width}
								height={drawing.cover.height}
								quality={10}
							/>
							<img />
						</div>
					</div>
				</PageSection>

				<PageSection className={css.content}>
					<div className={css.artwork_page}>
						{drawing.descriptionHtml && (
							<div
								dangerouslySetInnerHTML={
									drawing.descriptionHtml
								}
							></div>
						)}

						<div className={css.sidebar}>
							<BuySection original={original} prints={prints} />
						</div>
					</div>
				</PageSection>
			</main>
		</>
	);
}

export const getStaticPaths = async () => {
	const products = await getProducts();
	const paths = products.products.edges.map(({ node }: any) => ({
		params: { id: node.handle },
	}));
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { id }: any = context.params;
	const { product } = await getProduct(id);

	const getImage = ({ node }: any): IImage => ({
		src: node.url,
		altText: node.altText,
		width: node.width,
		height: node.height,
	});

	const getImages = (data: any): IImage[] => {
		return data.edges.map(getImage);
	};

	const drawing = {
		cover: getImages(product.images)[0],
		title: product.title,
		id: product.id,
		path: `artworks/${product.handle}`,
		minPrice: product.priceRange.minVariantPrice.amount,
		maxPrice: product.priceRange.maxVariantPrice.amount,
		description: product.description,
		descriptionHtml: { __html: product.descriptionHtml },
	};

	const data = await getVariants(id);

	const getOptionFromVariantNode = (node, optionName) => {
		return node.selectedOptions
			.find(
				(option) =>
					option.name.toLowerCase() == optionName.toLowerCase()
			)
			.value.toLowerCase();
	};

	const nodes = data.product.variants.edges.map(({ node }) => {
		const type = getOptionFromVariantNode(node, "type");
		const size = getOptionFromVariantNode(node, "size");

		return {
			id: node.id,
			type,
			size,
			price: node.priceV2,
		};
	});

	const [original, prints] = partition(nodes, (n) => n.type == "original");

	console.log(original, prints);

	return {
		props: {
			drawing,
			variants: {
				original: original[0],
				prints,
			},
		},
		revalidate: 1,
	};
};

function partition(array, isValid) {
	return array.reduce(
		([pass, fail], elem) => {
			return isValid(elem)
				? [[...pass, elem], fail]
				: [pass, [...fail, elem]];
		},
		[[], []]
	);
}
