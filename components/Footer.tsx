import PageSection from "./PageSection";
import { Twitter, Mail, Instagram, ArrowRight } from "react-feather";
import css from "./Footer.module.scss";
import { Border } from "./Border";

export default function Footer() {
	return (
		<>
			<Border />
			<PageSection elevated={true} className={css.section}>
				<footer className={css.footer}>
					<div className={css.footer_section}>
						<p className={css.footer_section_title}>Newsletter</p>
						<p className={css.newsletter_description}>
							Subscribe to my newsletter to get news about new
							projects, events and exhibitions. No spam, no
							junkmail, that is a promise.
						</p>
						<div className={css.input}>
							<input
								type="text"
								placeholder="Type your email here..."
							/>
							<button>
								Subscribe <ArrowRight size={16} />
							</button>
						</div>
					</div>
					<div className={css.footer_section}>
						<p className={css.footer_section_title}>Contact</p>
						<div className={css.socials}>
							<ul>
								<li>
									<a href="">
										<Mail size={16} />
									</a>
								</li>
								<li>
									<a href="">
										<Instagram size={16} />
									</a>
								</li>
								<li>
									<a href="">
										<Twitter size={16} />
									</a>
								</li>
							</ul>
						</div>
						<ul className={css.contact}>
							<li>
								<a href="">+44 09 75 56b67</a>
							</li>
							<li>
								<a href="">simon.renault.pro@gmail.com</a>
							</li>
						</ul>
					</div>
				</footer>
			</PageSection>
		</>
	);
}
