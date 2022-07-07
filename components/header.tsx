import Link from "next/link";
import css from "./header.module.scss";
import { ShoppingBag } from "react-feather";

export default function Header() {
	return (
		<div className={css.header}>
			<div className={css.header_inner}>
				<Link href="/">
					<a className={css.logo}></a>
				</Link>
				<nav className={css.nav}>
					<Link href="/">
						<a>Home</a>
					</Link>
					{/* <Link href="/artworks">
						<a>Gallery</a>
					</Link> */}
					<Link href="/blog">
						<a>Blog</a>
					</Link>
					<Link href="/about">
						<a>About</a>
					</Link>
					<Link href="/">
						<a className={css.shop}>
							<ShoppingBag size={16} />
							<span>Basket</span>
						</a>
					</Link>
				</nav>
			</div>
		</div>
	);
}
