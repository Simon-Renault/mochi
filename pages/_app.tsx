import type { AppProps } from "next/app";
import Header from "@components/nav/Header";
import Footer from "@components/Footer";
import "../styles/main.scss";
import css from "./_app.module.scss";
import Head from "next/head";
import { ContextProvider } from "@lib/shopContext";
import { AnimatePresence } from "framer-motion";
import { Router } from "next/router";

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
	fixTimeoutTransition(1000);
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
				<AnimatePresence
					exitBeforeEnter
					initial={false}
					onExitComplete={() => window.scrollTo(0, 0)}
				>
					<Component {...pageProps} key={router.route} />
				</AnimatePresence>
			</div>
			<div className={css.noise}></div>
			<Footer />
		</ContextProvider>
	);
}

export default MyApp;

export const fixTimeoutTransition = (timeout: number): void => {
	Router.events.on("beforeHistoryChange", () => {
		// Create a clone of every <style> and <link> that currently affects the page. It doesn't matter
		// if Next.js is going to remove them or not since we are going to remove the copies ourselves
		// later on when the transition finishes.
		const nodes = document.querySelectorAll(
			"link[rel=stylesheet], style:not([media=x])"
		);
		const copies = [...nodes].map(
			(el) => el.cloneNode(true) as HTMLElement
		);

		for (let copy of copies) {
			// Remove Next.js' data attributes so the copies are not removed from the DOM in the route
			// change process.
			copy.removeAttribute("data-n-p");
			copy.removeAttribute("data-n-href");

			// Add duplicated nodes to the DOM.
			document.head.appendChild(copy);
		}

		const handler = () => {
			// Emulate a `.once` method using `.on` and `.off`
			Router.events.off("routeChangeComplete", handler);

			window.setTimeout(() => {
				for (let copy of copies) {
					// Remove previous page's styles after the transition has finalized.
					document.head.removeChild(copy);
				}
			}, timeout);
		};

		Router.events.on("routeChangeComplete", handler);
	});
};
