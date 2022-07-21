import type { AppProps } from "next/app";
import Header from "@components/nav/Header";
import Footer from "@components/Footer";
import "../styles/main.scss";
import css from "./_app.module.scss";
import Head from "next/head";
import { ContextProvider } from "@lib/shopContext";
import { AnimatePresence } from "framer-motion";
import { usePageTransitionFix } from "@lib/use-page-transition-fix";

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
	usePageTransitionFix();
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
