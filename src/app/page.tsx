"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { CodeInput } from "@/components/ui/code-input";
import {
	TableRow,
	RankCell,
	ScoreCell,
	CodeCell,
	LangCell,
} from "@/components/ui/table-row";

export default function Home() {
	const [code, setCode] = useState("");
	const [roastMode, setRoastMode] = useState(true);

	return (
		<div className="flex flex-col gap-8 pb-16 pt-10">
			{/* Hero */}
			<div className="flex flex-col items-center gap-3">
				<h1 className="flex items-center gap-3 text-[36px] font-bold text-text-primary">
					<span className="text-accent-green">$</span>
					<span>pasta your code. get roasted.</span>
				</h1>
				<p className="max-w-[540px] text-center font-mono text-sm text-text-secondary">
					// drop your code below and we&apos;ll rate it — brutally honest or
					full roast mode
				</p>
			</div>

			{/* Code Input */}
			<div className="flex justify-center">
				<CodeInput
					placeholder={`function calculateTotal(items) {
  var total = 0;
  // TODO: fix this
  for (var i = 0; i < items.length; i++) {
    if (items[i].price > 100) {
      total = total + items[i].price * 0.9;
      console.log("discount applied");
    }
  }
  return total;
}`}
					rows={16}
					value={code}
					onChange={(e) => setCode(e.target.value)}
				/>
			</div>

			{/* Actions Bar */}
			<div className="flex justify-center">
				<div className="flex w-[780px] items-center justify-between">
					<div className="flex items-center gap-4">
						<Toggle
							pressed={roastMode}
							onPressedChange={setRoastMode}
							label="roast mode"
						/>
						<span className="text-xs text-text-tertiary">
							{roastMode
								? "// maximum sarcasm enabled"
								: "// polite mode activated"}
						</span>
					</div>
					<Button disabled={code.trim().length === 0}>$ roast_my_code</Button>
				</div>
			</div>

			{/* Footer Stats */}
			<div className="flex justify-center gap-6 text-xs text-text-tertiary">
				<span>2,847 codes roasted</span>
				<span>·</span>
				<span>avg score: 4.2/10</span>
			</div>

			{/* Spacer */}
			<div className="h-[60px]" />

			{/* Leaderboard Preview */}
			<div className="mx-auto flex w-[960px] flex-col gap-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span className="text-sm font-bold text-accent-green">//</span>
						<span className="text-sm font-bold text-text-primary">
							shame_leaderboard
						</span>
					</div>
					<Link
						href="/leaderboard"
						className="flex items-center gap-1 rounded border border-border-primary px-3 py-1.5 text-xs text-text-secondary hover:bg-muted"
					>
						$ view_all &gt;&gt;
					</Link>
				</div>

				<p className="text-xs font-mono text-text-tertiary">
					// the worst code on the internet, ranked by shame
				</p>

				<div className="overflow-hidden rounded-md border border-border-primary">
					{/* Table Header */}
					<div className="flex h-10 items-center border-b border-border-primary bg-bg-surface px-5">
						<span className="w-10 text-xs font-medium text-text-tertiary">
							#
						</span>
						<span className="w-15 text-xs font-medium text-text-tertiary">
							score
						</span>
						<span className="flex-1 text-xs font-medium text-text-tertiary">
							code
						</span>
						<span className="w-[100px] text-xs font-medium text-text-tertiary">
							lang
						</span>
					</div>

					{/* Rows */}
					<div className="flex flex-col">
						<TableRow>
							<RankCell rank={1} />
							<ScoreCell>1.2</ScoreCell>
							<CodeCell>eval(prompt(...))</CodeCell>
							<LangCell>javascript</LangCell>
						</TableRow>
						<TableRow>
							<RankCell rank={2} />
							<ScoreCell>1.8</ScoreCell>
							<CodeCell>if (x == true)...</CodeCell>
							<LangCell>typescript</LangCell>
						</TableRow>
						<TableRow>
							<RankCell rank={3} />
							<ScoreCell>2.1</ScoreCell>
							<CodeCell>SELECT * FROM users...</CodeCell>
							<LangCell>sql</LangCell>
						</TableRow>
					</div>
				</div>

				<p className="text-center text-xs text-text-tertiary">
					showing top 3 of 2,847 ·{" "}
					<Link href="/leaderboard" className="underline">
						view full leaderboard &gt;&gt;
					</Link>
				</p>
			</div>
		</div>
	);
}
