import { tv, type VariantProps } from "tailwind-variants";

const dotVariants = tv({
	base: "rounded-full",
	variants: {
		variant: {
			critical: "bg-accent-red",
			warning: "bg-accent-amber",
			good: "bg-accent-green",
		},
		size: {
			sm: "w-2 h-2",
			default: "w-2 h-2",
		},
	},
	defaultVariants: {
		variant: "critical",
		size: "default",
	},
});

export interface DotProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof dotVariants> {}

function Dot({ className, variant, size, ...props }: DotProps) {
	return (
		<div className={dotVariants({ variant, size, className })} {...props} />
	);
}

export { Dot, dotVariants };
