import * as React from "react";

export interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {}

function TableRow({ className, ...props }: TableRowProps) {
	return (
		<div
			className={`flex items-center gap-6 border-b border-border-primary px-5 py-4 ${className ?? ""}`}
			{...props}
		/>
	);
}

function TableCell({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={className} {...props} />;
}

export interface TableRowCellProps
	extends React.HTMLAttributes<HTMLDivElement> {
	rank?: number;
}

function RankCell({ className, rank, ...props }: TableRowCellProps) {
	return (
		<TableCell
			className={`w-10 text-sm text-muted-foreground ${className ?? ""}`}
			{...props}
		>
			#{rank}
		</TableCell>
	);
}

function ScoreCell({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<TableCell
			className={`w-15 text-sm font-bold text-accent-red ${className ?? ""}`}
			{...props}
		/>
	);
}

function CodeCell({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<TableCell
			className={`flex-1 truncate text-sm text-muted-foreground ${className ?? ""}`}
			{...props}
		/>
	);
}

function LangCell({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<TableCell
			className={`w-[100px] text-xs text-muted-foreground ${className ?? ""}`}
			{...props}
		/>
	);
}

export { TableRow, TableCell, RankCell, ScoreCell, CodeCell, LangCell };
