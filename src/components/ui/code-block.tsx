import { codeToHtml } from "shiki";

export interface CodeBlockProps {
	code: string;
	language?: string;
	filename?: string;
}

async function CodeBlock({
	code,
	language = "javascript",
	filename,
}: CodeBlockProps) {
	const html = await codeToHtml(code, {
		lang: language,
		theme: "github-dark",
	});

	const lines = code.split("\n");

	return (
		<div className="w-[560px] overflow-hidden rounded-md border border-border-primary bg-bg-input">
			<div className="flex h-10 items-center gap-3 border-b border-border-primary px-4">
				<div className="flex gap-1.5">
					<div className="h-2.5 w-2.5 rounded-full bg-red-500" />
					<div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
					<div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
				</div>
				{filename && (
					<span className="ml-auto text-xs text-muted-foreground">
						{filename}
					</span>
				)}
			</div>
			<div className="flex">
				<div className="flex w-10 flex-col items-end border-r border-border-primary bg-bg-surface py-3 pr-2.5 text-sm leading-6 text-muted-foreground">
					{lines.map((_, i) => (
						<span key={i}>{i + 1}</span>
					))}
				</div>
				<div
					className="flex-1 overflow-x-auto p-3 text-sm leading-6"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</div>
		</div>
	);
}

export { CodeBlock };
