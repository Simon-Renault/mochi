import type { AppProps } from "next/app";
import Head from "@components/Head";
import Header from "@components/nav/Header";
import Footer from "@components/Footer";
import "../styles/main.scss";
import css from "./_app.module.scss";

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
	return (
		<>
			<Head />
			<Header />
			<div className={css.scroll_container}>
				<Component {...pageProps} key={router.route} />
			</div>
			<Footer />
		</>
	);
}

export default MyApp;
