import React, { useState } from "react";
import { motion } from "framer-motion";
import css from "./MobileNav.module.scss";
import { Menu, X } from "react-feather";
import { NAV_ITEMS } from "./config";

const MobileNav = () => {
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	const hideNavItemsVariant = {
		opened: {
			opacity: 0,
			y: "-100%",
			transition: {
				duration: 0.5,
				ease: "easeInOut",
			},
		},
		closed: {
			opacity: 1,
			y: "0%",
			transition: {
				delay: 1.1,
				duration: 0.5,
				ease: "easeInOut",
			},
		},
	};

	const mobileMenuVariant = {
		opened: {
			y: "0%",
			transition: {
				delay: 0.15,
				duration: 1.1,
				ease: [0.74, 0, 0.19, 1.02],
			},
		},
		closed: {
			y: "-100%",
			transition: {
				delay: 0.35,
				duration: 0.63,
				ease: [0.74, 0, 0.19, 1.02],
			},
		},
	};

	const fadeInVariant = {
		opened: {
			opacity: 1,
			transition: {
				delay: 1.2,
			},
		},
		closed: { opacity: 0 },
	};

	const ulVariant = {
		opened: {
			transition: {
				delayChildren: 1,
				staggerChildren: 0.18,
			},
		},
		closed: {
			transition: {
				staggerChildren: 0.06,
				staggerDirection: -1,
			},
		},
	};

	const liVariant = {
		opened: {
			opacity: 1,
			y: "0%",
			transition: {
				duration: 0.65,
				ease: "easeOut",
			},
		},
		closed: {
			opacity: 0,
			y: "100%",
			transition: {
				duration: 0.25,
				ease: "easeInOut",
			},
		},
	};

	return (
		<motion.nav
			className={css.nav}
			initial="closed"
			animate={mobileNavOpen ? "opened" : "closed"}
		>
			<motion.div
				variants={hideNavItemsVariant}
				className={css.menu_container}
				onClick={() => setMobileNavOpen(true)}
			>
				<Menu size={20} />
			</motion.div>

			<motion.div
				variants={mobileMenuVariant}
				className={css.mobile_menu}
			>
				<motion.button
					variants={fadeInVariant}
					onClick={() => setMobileNavOpen(false)}
				>
					<X size={20} />
				</motion.button>
				<motion.ul variants={ulVariant}>
					{NAV_ITEMS.map((navItem) => (
						<motion.li whileTap={{ scale: 0.95 }} key={navItem.id}>
							<motion.div variants={liVariant}>
								{navItem.navTitle}
							</motion.div>
						</motion.li>
					))}
				</motion.ul>
				<motion.div variants={fadeInVariant} className={css.contact}>
					<h5>+852 5650 2233</h5>
					<h5>simon-renault@gmail.com.com</h5>
				</motion.div>
			</motion.div>
		</motion.nav>
	);
};

export default MobileNav;
