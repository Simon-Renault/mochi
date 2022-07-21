import type { AppProps } from "next/app";
import Header from "@components/nav/Header";
import Footer from "@components/Footer";
import "../styles/main.scss";
import css from "./_app.module.scss";
import Head from "next/head";
import { ContextProvider } from "@lib/shopContext";
import { AnimatePresence } from "framer-motion";
import Router from "next/router";

const tempFix = () => {
	const allStyleElems = document.querySelectorAll('style[media="x"]');
	allStyleElems.forEach((elem) => {
		elem.removeAttribute("media");
	});
};
const routeChange = () => {
	// Temporary fix to avoid flash of unstyled content
	// during route transitions. Keep an eye on this
	// issue and remove this code when resolved:
	// https://github.com/vercel/next.js/issues/17464

	tempFix();
};

Router.events.on("routeChangeComplete", routeChange);
Router.events.on("routeChangeStart", routeChange);

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
	tempFix();
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
				<AnimatePresence exitBeforeEnter initial={false}>
					<Component {...pageProps} key={router.route} />
				</AnimatePresence>
			</div>
			<div className={css.noise}></div>
			<Footer />
		</ContextProvider>
	);
}

export default MyApp;
