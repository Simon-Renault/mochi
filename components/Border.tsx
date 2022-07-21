import classNames from "classnames";
import css from "./Border.module.scss";

interface IBorderProps {
	isWhite?: boolean;
}

export const Border = ({ isWhite }: IBorderProps) => {
	return (
		<svg
			className={classNames(css.border, isWhite && css.white)}
			viewBox="0 0 1600 150"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M150 17h-9l-2-3-12-2c-2-3-8-2-11-6-2 0-4-1-6 1h-5c-1-2-3-2-4-2-3 0-4-2-5-3-2-1-4-1-6 1l-5-2h-1c-7 1-14 5-21 5l-6 1c-3 0-6 3-8 3-2-1-3 7-5 7 0-1-6 8-7 7-4-1-4 4-8 6H16c-5-2-10 7-16 6v742h1611V115s-7 0-10 2l-7 4c-4 1-5 5-7 5-4 0-7 5-11 4-2-1-5 4-8 5l-3-3c-4-1-5 3-8 5-3-2-8 4-11 2h-1c-4 1-8-1-12-2-2-1-4 3-5 3-3-1-12-2-13-4h-10c-7-5-15-7-23-8-2-1-4-3-7-3l-3 1c-3-1-2-3-2-5l-3-2-3 4c-3 0-2-3-3-4-3-2-4 1-7 2s-7-1-10-1l-11-1c-4-2-6-6-10-7l-4 1c-3 1-6 0-8-1l-5-3c-2 0-3-1-4-3-2-2-3-5-7-4l-3 2c-3 1-5 1-8-1l-5-1-4 2c-6 1-10-3-14-6-2 1-1 3-2 4-5-1-10-1-13-5-4-1-5 3-8 4l-5-1c-3 0-7-1-9-3l-12 4c-2 2-5 1-8 3l-3 1-1 1c-4 1-7 4-10 7l-7-1c-4-1-7 0-10 1-3 2-5 2-7 2-8 3-15 0-22-2l-4-1-3 2c-2 1-3 0-5-1-3-2-6-3-10-3l-8-4-1-5-6-1c-1 4-1 4 3 9h-2l-3-2h-7c-3-1-2-6-4-6-4-2-6 0-9 2-3-1-6 1-10 1l-3 2h-4l-8-4c-4-1-8-4-11-7-2-2-3-5-7-5l-5-5-14-4c-4 3-9 2-15 1-1 0-2 0-3 2l-4 2-13-1-9 2c-3-2-3-5-5-7-3 1-6 0-10 2s-9 2-13 0l-8-5c-2 0-4-2-7-1l-2-2-3 1c-4 3-8 3-13 1-4-2-8-5-14-4l-6 1-11 1c-2 1-4 0-6-2l-2-1h-11l-17-5-2-3c-3 0-5-3-7-4l-5-5c-5-1-9-1-13 4-3 0-3 0-5-3l-2 1h-2c0 2-9 1-9 0 0-2-2-3-3-3-3 0-3-2-3-4l-4-1h-4c-5 3-7 3-15-1-1 0-1 2-3 2l-3-3c-3-3-6-4-10-4h-2l-2-4c-2-1-3 1-4 1l-4 3c-2-3-5-3-6-6l-5-2c-1 1-3 3-5 3-2-2-4-3-6-1-3 1-6 2-8-1l-3 1h-3l-12 1h-3l-9 3-11-6-3 3-4-2-4 2c-5 1-12-2-17 3l-2-2-5 3c-2 2-5 2-9 2-6-1-11-2-17 0l-4-1h-14l-2 2-8-1-3-1c-4 1-8 2-12 0-3 2-7 1-11 1l-9-2-5-1c-3 0-6-1-8-3h-6c-2 1-5 2-8 1l-3-1-20-1c-6-3-9-8-14-11l-6-2h-4l-5 1c-4 1-7-1-10-3-1-2-3-3-3-5h-9l-4 3-14-1c-3-3-6-6-10-3l-1-1c0-4-3-4-6-5l-8-2c-2 2-5 4-9 4l-5-3c-2-2-4-2-7-2-4-4-8 4-12 0-3-1-4-3-6-1-3-1-7-1-9 1-2 0-3-5-5-5-3-2-3 4-6 2-2 2-6-2-8-1l-3 4c-3 0-5 2-7 3l-14 1-3-1c-2-2-4-1-7-1l-7 1h-2c-6-2-12 1-16 0l-15 5-4 4c-4-1-7 2-11 3-4-2-7-5-9-8l-4-1-6 2c-6 1-12 3-16-3h-11c-4 3-9 3-14 2h-3l-10 7c-3 2-5 2-8 2l-5-6-5-1-6 5-3 1h-3c-4 0-9 0-12-3l-3-1-11-1c-2-1-4 0-6 2l-2 1h-6l-2-3-6-1-5 2-3 3c-3 2-5 3-9 2l-7 4c-5-1-11-1-15-4l-6-1-5-3-3-1Z" />
		</svg>
	);
};
