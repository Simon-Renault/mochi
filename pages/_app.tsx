import type { AppProps } from "next/app";
import Header from "@components/nav/Header";
import Footer from "@components/Footer";
import "../styles/main.scss";
import css from "./_app.module.scss";
import Head from "next/head";
import { ContextProvider } from "@lib/shopContext";
import { storyblokInit, apiPlugin } from "@storyblok/react";

const testResolver = [
	"featured_drawings.drawings",
	"featured_drawings.artworks",
	"featuredDrawings.drawings",
	"featuredDrawings.artworks",
	"featuredDrawings",
	"drawings",
	"Drawings",
	"artworks",
	"Artworks",
	"home.drawings",
	"featuredArticles.article",
];

storyblokInit({
	accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
	use: [apiPlugin],
	resolveRelations: testResolver,
});

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
	return (
		<ContextProvider>
			<Head>
				<link rel="icon" type="image/png" href="/favicon.png" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<Header />
			<div className={css.scroll_container}>
				<Component {...pageProps} key={router.route} />
			</div>
			<div className={css.noise}></div>
			<Footer />
		</ContextProvider>
	);
}

export default MyApp;
