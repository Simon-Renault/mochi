import Link from "next/link";
import css from "./Header.module.scss";
import { ShoppingBag } from "react-feather";
import MobileNav from "@components/nav/MobileNav";
import { NAV_ITEMS } from "./config";
import { motion } from "framer-motion";

export default function Header() {
	return (
		<div className={css.header}>
			<div className={css.header_inner}>
				<Link href="/">
					<a className={css.logo}></a>
				</Link>
				<MobileNav />
				<nav className={css.nav}>
					<ul className={css.links}>
						{NAV_ITEMS.map((navItem) => (
							<motion.li
								whileTap={{ scale: 0.95 }}
								key={navItem.id}
							>
								<Link href={navItem.url}>
									<a>{navItem.navTitle}</a>
								</Link>
							</motion.li>
						))}
					</ul>

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
