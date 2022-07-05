import css from "./PageSection.module.scss";

interface IPageSection {
	elevated?: boolean;
	className?: string;
	children?: JSX.Element | JSX.Element[];
}

export default function PageSection({
	children,
	elevated,
	className,
}: IPageSection) {
	const classNames = [
		css.page_section,
		elevated && css.elevated,
		className,
	].join(" ");
	return <div className={classNames}>{children}</div>;
}
