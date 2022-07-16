import { FC } from "react";
import NextHead from "next/head";
import { DefaultSeo } from "next-seo";

const config = {
	title: "Simon Renault - Illustration & art",
	titleTemplate: "%s - Simon Renault",
	description:
		"French artist based in London. Exploring the relationship between nature and cities, with a touch of chaos.",
	openGraph: {
		title: "Simon Renault - Illustration & art",
		description:
			"French artist based in London. Exploring the relationship between nature and cities, with a touch of chaos.",
		type: "website",
		locale: "en_IE",
		url: "https://www.simon-renault.art",
		site_name: "Simon Renault - Drawing",
		images: [
			{
				url: "/images/cover.png",
				width: 800,
				height: 600,
				alt: "Drawing image",
			},
		],
	},
};

const Head: FC = () => {
	return (
		<>
			<DefaultSeo {...config} />
			<NextHead>
				<link rel="icon" type="image/png" href="/favicon.png" />
			</NextHead>
		</>
	);
};

export default Head;
