import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badgeVariants = tv({
	base: "inline-flex items-center gap-2",
	variants: {
		variant: {
			critical: "text-accent-red",
			warning: "text-accent-amber",
			good: "text-accent-green",
			verdict: "text-accent-red",
		},
	},
	defaultVariants: {
		variant: "critical",
	},
});

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={badgeVariants({ variant, className })} {...props} />;
}

export { Badge, badgeVariants };
