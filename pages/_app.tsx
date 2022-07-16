import type { AppProps } from "next/app";
import Header from "@components/nav/Header";
import Footer from "@components/Footer";
import "../styles/main.scss";
import css from "./_app.module.scss";
import Head from "next/head";

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
	return (
		<>
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
			<Footer />
		</>
	);
}

export default MyApp;
