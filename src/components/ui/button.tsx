import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
	base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			default:
				"bg-accent-green text-foreground hover:bg-accent-green/90 disabled:hover:bg-accent-green shadow-sm",
			destructive:
				"bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:hover:bg-destructive shadow-sm",
			outline:
				"border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:hover:bg-background",
			secondary:
				"bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:hover:bg-secondary",
			ghost:
				"hover:bg-accent hover:text-accent-foreground disabled:hover:bg-transparent",
			link: "text-primary underline-offset-4 hover:underline",
		},
		size: {
			default: "h-10 px-6 py-2.5",
			sm: "h-8 px-3 text-xs",
			lg: "h-12 px-8 text-base",
			icon: "h-9 w-9",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={buttonVariants({ variant, size, className })}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
