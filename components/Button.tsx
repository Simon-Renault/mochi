import cn from "classnames";
import React, {
	forwardRef,
	ButtonHTMLAttributes,
	JSXElementConstructor,
	useRef,
} from "react";
import css from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	href?: string;
	className?: string;
	onClick?: () => void;
	fill?: boolean;
	disabled?: boolean;
	outlined?: boolean;
	rounded?: boolean;
	active?: boolean;
	intent?: "primary" | "Secondary";
	Component?: string | JSXElementConstructor<any>;
}

const Button: React.FC<ButtonProps> = (props) => {
	const {
		href,
		className,
		onClick,
		children,
		active,
		outlined,
		fill,
		disabled,
		rounded,
		intent = "primary",
		Component = href?.length ? "a" : "button",
		...rest
	} = props;

	const intentClassName = intent == "primary" ? css.primary : css.secondary;

	const rootClassName = cn(
		css.root,
		{
			[css.outlined]: outlined,
			[css.disabled]: disabled,
			[css.rounded]: rounded,
			[css.fill]: fill,
			[css.disabled]: disabled,
		},
		intentClassName,
		className
	);

	return (
		<Component
			href={href}
			aria-pressed={active}
			className={rootClassName}
			disabled={disabled}
			onClick={onClick}
			{...rest}
		>
			{children}
		</Component>
	);
};

export default Button;
