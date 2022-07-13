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
	variant?: "flat" | "outlined";
	active?: boolean;
	type?: "submit" | "reset" | "button";
	Component?: string | JSXElementConstructor<any>;
	width?: string | number;
	loading?: boolean;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = forwardRef((props) => {
	const {
		className,
		variant = "flat",
		children,
		active,
		width,
		loading = false,
		disabled = false,
		style = {},
		Component = "button",
		...rest
	} = props;

	const rootClassName = cn(
		css.root,
		{
			[css.outlined]: variant === "outlined",
			[css.loading]: loading,
			[css.disabled]: disabled,
		},
		className
	);

	return (
		<Component
			aria-pressed={active}
			data-variant={variant}
			className={rootClassName}
			disabled={disabled}
			style={{
				width,
				...style,
			}}
			{...rest}
		>
			{children}
			{loading && <i>loading</i>}
		</Component>
	);
});

export default Button;