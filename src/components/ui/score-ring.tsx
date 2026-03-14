"use client";

import * as React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export interface ScoreRingProps {
	score: number;
	max?: number;
	className?: string;
}

function ScoreRing({ score, max = 10, className }: ScoreRingProps) {
	const percentage = (score / max) * 100;

	return (
		<div className={`relative h-[180px] w-[180px] ${className ?? ""}`}>
			<CircularProgressbar
				value={percentage}
				maxValue={100}
				strokeWidth={4}
				styles={buildStyles({
					strokeLinecap: "round",
					pathColor: "url(#gradient)",
					trailColor: "#2a2a2a",
				})}
			/>
			<svg className="hidden">
				<defs>
					<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#10b981" />
						<stop offset="100%" stopColor="#f59e0b" />
					</linearGradient>
				</defs>
			</svg>
			<div className="absolute inset-0 flex flex-col items-center justify-center">
				<span className="text-[48px] font-bold leading-none text-card-foreground">
					{score}
				</span>
				<span className="text-base leading-none text-muted-foreground">
					/{max}
				</span>
			</div>
		</div>
	);
}

export { ScoreRing };
