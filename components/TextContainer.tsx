import { ReactNode } from "react";
import css from "./TextContainer.module.scss";
interface ITextContainerProps {
	children: ReactNode;
}
export const TextContainer = ({ children }: ITextContainerProps) => {
	return <div className={css.container}>{children}</div>;
};
