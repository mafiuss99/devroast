import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

function Card({ className, ...props }: CardProps) {
	return (
		<div
			className={`w-[480px] rounded-md border border-border-primary bg-card p-5 ${className ?? ""}`}
			{...props}
		/>
	);
}

function CardHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={`flex items-center gap-2 ${className ?? ""}`} {...props} />
	);
}

function CardTitle({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h3
			className={`text-sm font-medium text-card-foreground ${className ?? ""}`}
			{...props}
		/>
	);
}

function CardDescription({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={`text-sm leading-normal text-muted-foreground ${className ?? ""}`}
			{...props}
		/>
	);
}

function CardContent({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={`flex flex-col gap-3 ${className ?? ""}`} {...props} />
	);
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
