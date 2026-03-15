"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";
import { createHighlighter } from "shiki";

export interface CodeEditorWithHighlightProps {
	initialCode?: string;
	onCodeChange?: (code: string, language: string) => void;
}

type Language = string;

const SUPPORTED_LANGUAGES: Language[] = [
	"javascript",
	"typescript",
	"python",
	"go",
	"rust",
	"java",
	"c",
	"cpp",
	"csharp",
	"php",
	"ruby",
	"swift",
	"kotlin",
	"html",
	"css",
	"scss",
	"json",
	"yaml",
	"xml",
	"markdown",
	"sql",
	"bash",
	"shell",
	"powershell",
	"dockerfile",
	"graphql",
	"lua",
	"perl",
	"r",
	"haskell",
	"elixir",
	"erlang",
	"clojure",
	"fsharp",
	"dart",
	"julia",
	"ini",
	"toml",
	"text",
];

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

async function getHighlighter() {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: ["github-dark"],
			langs: SUPPORTED_LANGUAGES,
		});
	}
	return highlighterPromise;
}

async function highlightCode(
	code: string,
	language: Language,
): Promise<string> {
	if (!code.trim() || language === "text") {
		return "";
	}

	try {
		const highlighter = await getHighlighter();
		const html = highlighter.codeToHtml(code, {
			lang: language,
			theme: "github-dark",
		});
		return html;
	} catch {
		return "";
	}
}

function parseHighlightHtml(html: string): React.ReactNode[] {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	const pre = doc.querySelector("pre");
	if (!pre) return [];

	const lines = pre.innerHTML.split("\n");
	return lines.map((line, index) => {
		const key = `line-${index}`;
		if (line.trim() === "") {
			return <br key={key} />;
		}
		// eslint-disable-next-line react/no-danger
		return <span key={key} dangerouslySetInnerHTML={{ __html: line }} />;
	});
}

export function CodeEditorWithHighlight({
	initialCode = "",
	onCodeChange,
}: CodeEditorWithHighlightProps) {
	const [code, setCode] = React.useState(initialCode);
	const [selectedLanguage, setSelectedLanguage] =
		React.useState<Language>("text");
	const [highlightedHtml, setHighlightedHtml] = React.useState("");
	const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
	const [isHighlighterReady, setIsHighlighterReady] = React.useState(false);
	const [isTyping, setIsTyping] = React.useState(false);

	const textareaRef = React.useRef<HTMLTextAreaElement>(null);
	const highlightRef = React.useRef<HTMLDivElement>(null);
	const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

	React.useEffect(() => {
		getHighlighter().then(() => {
			setIsHighlighterReady(true);
		});
	}, []);

	React.useEffect(() => {
		if (selectedLanguage === "text") {
			setHighlightedHtml("");
		}
	}, [selectedLanguage]);

	React.useEffect(() => {
		let mounted = true;
		let timeoutId: NodeJS.Timeout;

		const doHighlight = async () => {
			if (!code.trim() || selectedLanguage === "text" || isTyping) {
				setHighlightedHtml("");
				return;
			}

			if (!isHighlighterReady) {
				return;
			}

			const html = await highlightCode(code, selectedLanguage);
			if (mounted) {
				setHighlightedHtml(html);
			}
		};

		if (selectedLanguage !== "text") {
			timeoutId = setTimeout(doHighlight, 300);
		}

		return () => {
			mounted = false;
			clearTimeout(timeoutId);
		};
	}, [code, selectedLanguage, isHighlighterReady, isTyping]);

	const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newCode = e.target.value;
		setCode(newCode);
		onCodeChange?.(newCode, selectedLanguage);

		setIsTyping(true);
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}
		typingTimeoutRef.current = setTimeout(() => {
			setIsTyping(false);
		}, 300);
	};

	const handleScroll = () => {
		if (textareaRef.current && highlightRef.current) {
			highlightRef.current.scrollTop = textareaRef.current.scrollTop;
			highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
		}
	};

	const handleLanguageChange = (lang: Language) => {
		setSelectedLanguage(lang);
		setIsDropdownOpen(false);
	};

	const lineCount = code.split("\n").length || 1;
	const lineNumbers = Array.from(
		{ length: Math.max(lineCount, 16) },
		(_, i) => i + 1,
	);

	const hasHighlight = highlightedHtml && selectedLanguage !== "text";

	const showTransparentText = hasHighlight && !isTyping;

	return (
		<div className="flex w-full max-w-[780px] flex-col gap-4">
			<div className="flex items-center gap-3">
				<div className="relative">
					<button
						type="button"
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						className="flex items-center gap-2 rounded-md border border-border-primary bg-bg-input px-3 py-1.5 text-sm text-text-primary hover:bg-bg-surface"
					>
						<span className="text-muted-foreground">Language:</span>
						<span className="font-medium">{selectedLanguage}</span>
						<ChevronDown
							className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
							aria-hidden="true"
						/>
					</button>

					{isDropdownOpen && (
						<div className="absolute z-50 mt-1 max-h-64 w-48 overflow-auto rounded-md border border-border-primary bg-bg-input shadow-lg">
							{SUPPORTED_LANGUAGES.map((lang) => (
								<button
									key={lang}
									type="button"
									onClick={() => handleLanguageChange(lang)}
									className={`w-full px-3 py-2 text-left text-sm hover:bg-bg-surface ${
										lang === selectedLanguage
											? "bg-accent text-accent-foreground"
											: "text-text-primary"
									}`}
								>
									{lang}
								</button>
							))}
						</div>
					)}
				</div>

				{selectedLanguage !== "text" && (
					<button
						type="button"
						onClick={() => setSelectedLanguage("text")}
						className="text-xs text-muted-foreground hover:text-text-primary"
					>
						Clear
					</button>
				)}

				{selectedLanguage !== "text" && !highlightedHtml && (
					<span className="text-xs text-muted-foreground">Highlighting...</span>
				)}
			</div>

			<div className="flex w-[780px] overflow-hidden rounded-md border border-border-primary bg-bg-input">
				<div className="flex min-h-[360px] w-12 flex-col items-end border-r border-border-primary bg-bg-surface px-2 py-4 text-xs leading-6 text-muted-foreground">
					{lineNumbers.map((num) => (
						<span key={num} className="h-6">
							{num}
						</span>
					))}
				</div>
				<div className="relative flex-1 overflow-auto">
					{hasHighlight && (
						<div
							ref={highlightRef}
							className="absolute inset-0 whitespace-pre-wrap break-all font-mono text-sm leading-6 text-transparent"
							aria-hidden="true"
						>
							{parseHighlightHtml(highlightedHtml)}
						</div>
					)}
					<textarea
						ref={textareaRef}
						value={code}
						onChange={handleCodeChange}
						onScroll={handleScroll}
						className="relative h-full min-h-[360px] w-full resize-none bg-transparent p-4 font-mono text-sm leading-6 outline-none placeholder:text-muted-foreground"
						spellCheck={false}
						placeholder="Paste your code here..."
						style={{
							color: showTransparentText
								? "transparent"
								: selectedLanguage === "text"
									? "#ffffff"
									: "inherit",
						}}
					/>
				</div>
			</div>
		</div>
	);
}
