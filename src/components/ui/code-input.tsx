import * as React from "react";

export interface CodeInputProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

function CodeInput({ className, ...props }: CodeInputProps) {
	return (
		<div className="w-[780px] overflow-hidden rounded-md border border-border-primary bg-bg-input">
			<div className="flex h-10 items-center gap-3 border-b border-border-primary px-4">
				<div className="flex gap-2">
					<div className="h-3 w-3 rounded-full bg-red-500" />
					<div className="h-3 w-3 rounded-full bg-amber-500" />
					<div className="h-3 w-3 rounded-full bg-emerald-500" />
				</div>
			</div>
			<div className="flex">
				<div className="flex w-12 flex-col items-end border-r border-border-primary bg-bg-surface py-4 pr-3 text-xs leading-6 text-text-tertiary">
					{Array.from({ length: 16 }, (_, i) => (
						<span key={i}>{i + 1}</span>
					))}
				</div>
				<textarea
					className={`flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-6 text-text-primary placeholder:text-text-tertiary focus:outline-none ${className ?? ""}`}
					spellCheck={false}
					{...props}
				/>
			</div>
		</div>
	);
}

export { CodeInput };
