"use client";

import * as React from "react";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const toggleVariants = tv({
	base: "group relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			default: "bg-border-primary",
			on: "bg-accent-green",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const toggleKnobVariants = tv({
	base: "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform",
	variants: {
		variant: {
			default: "translate-x-0 bg-muted-foreground",
			on: "translate-x-[18px] bg-black",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface ToggleProps
	extends React.ComponentPropsWithoutRef<typeof BaseToggle>,
		VariantProps<typeof toggleVariants> {
	label?: string;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
	({ className, variant, pressed, label, ...props }, ref) => {
		const isOn = pressed ?? variant === "on";
		const currentVariant =
			pressed === undefined ? variant : pressed ? "on" : "default";

		return (
			<div className="flex items-center gap-3">
				<BaseToggle
					ref={ref}
					pressed={pressed}
					className={cn(toggleVariants({ variant: currentVariant }), className)}
					{...props}
				>
					<span className={toggleKnobVariants({ variant: currentVariant })} />
				</BaseToggle>
				{label && (
					<span
						className={isOn ? "text-accent-green" : "text-muted-foreground"}
					>
						{label}
					</span>
				)}
			</div>
		);
	},
);
Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };
