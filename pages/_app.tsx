import type { AppProps } from "next/app";
import Head from "@components/Head";
import Header from "@components/header";
import "../styles/globals.scss";

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
	return (
		<>
			<Head />
			<Header />
			<Component {...pageProps} key={router.route} />
		</>
	);
}

export default MyApp;
