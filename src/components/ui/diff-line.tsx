import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const diffLineRootVariants = tv({
	base: "flex gap-2 px-4 py-2 font-mono text-sm",
	variants: {
		type: {
			removed: "bg-diff-removed",
			added: "bg-diff-added",
			context: "",
		},
	},
	defaultVariants: {
		type: "context",
	},
});

const diffPrefixVariants = tv({
	base: "w-4 shrink-0",
	variants: {
		type: {
			removed: "text-accent-red",
			added: "text-accent-green",
			context: "text-muted-foreground",
		},
	},
	defaultVariants: {
		type: "context",
	},
});

const diffCodeVariants = tv({
	base: "flex-1",
	variants: {
		type: {
			removed: "text-muted-foreground",
			added: "text-card-foreground",
			context: "text-muted-foreground",
		},
	},
	defaultVariants: {
		type: "context",
	},
});

export interface DiffLineRootProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof diffLineRootVariants> {}

function DiffLineRoot({ type, className, ...props }: DiffLineRootProps) {
	return (
		<div className={diffLineRootVariants({ type, className })} {...props} />
	);
}

export interface DiffLinePrefixProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof diffPrefixVariants> {}

function DiffLinePrefix({
	type,
	className,
	children,
	...props
}: DiffLinePrefixProps) {
	const prefix = type === "added" ? "+" : type === "removed" ? "-" : " ";

	return (
		<span className={diffPrefixVariants({ type, className })} {...props}>
			{children ?? prefix}
		</span>
	);
}

export interface DiffLineCodeProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof diffCodeVariants> {}

function DiffLineCode({ type, className, ...props }: DiffLineCodeProps) {
	return <span className={diffCodeVariants({ type, className })} {...props} />;
}

export interface DiffLineProps extends DiffLineRootProps {
	code: string;
}

function DiffLine({ type, code, className, ...props }: DiffLineProps) {
	return (
		<DiffLineRoot type={type} className={className} {...props}>
			<DiffLinePrefix type={type} />
			<DiffLineCode type={type}>{code}</DiffLineCode>
		</DiffLineRoot>
	);
}

export {
	DiffLine,
	DiffLineRoot,
	DiffLinePrefix,
	DiffLineCode,
	diffLineRootVariants,
};
