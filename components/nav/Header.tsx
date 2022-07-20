import Link from "next/link";
import css from "./Header.module.scss";
import { ShoppingBag } from "react-feather";
import MobileNav from "@components/nav/MobileNav";
import { NAV_ITEMS } from "@lib/config";
import { motion } from "framer-motion";
import { Context } from "@lib/shopContext";
import { useContext } from "react";

export default function Header() {
	const { cartID, cartItems } = useContext(Context);
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

					<Link href="/cart">
						<a className={css.shop}>
							<ShoppingBag size={16} />
							<span>Basket</span>
							{true && <span>- {cartItems.length}</span>}
						</a>
					</Link>
				</nav>
			</div>
		</div>
	);
}
