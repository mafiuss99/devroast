"use client";

import * as React from "react";

export interface CodeEditorProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	lines?: number;
}

const CodeEditor = React.forwardRef<HTMLTextAreaElement, CodeEditorProps>(
	({ className, lines = 16, value, onChange, ...props }, ref) => {
		const lineNumbers = Array.from({ length: lines }, (_, i) => i + 1);

		return (
			<div className="flex w-[780px] overflow-hidden rounded-md border border-border-primary bg-bg-input">
				<div className="flex h-[360px] w-12 flex-col items-end border-r border-border-primary bg-bg-surface py-4 pr-3 text-xs leading-6 text-muted-foreground">
					{lineNumbers.map((num) => (
						<span key={num}>{num}</span>
					))}
				</div>
				<textarea
					ref={ref}
					value={value}
					onChange={onChange}
					className={`flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-6 text-card-foreground outline-none placeholder:text-muted-foreground ${className ?? ""}`}
					spellCheck={false}
					{...props}
				/>
			</div>
		);
	},
);
CodeEditor.displayName = "CodeEditor";

export { CodeEditor };
