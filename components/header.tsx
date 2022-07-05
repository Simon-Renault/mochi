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
						<a>Gallery</a>
					</Link>
					<Link href="/">
						<a>Blog</a>
					</Link>
					<Link href="/">
						<a>About</a>
					</Link>
					<Link href="/">
						<a className={css.shop}>
							<ShoppingBag size={16} />
							<span>Shop</span>
						</a>
					</Link>
				</nav>
			</div>
		</div>
	);
}
