"use client";

import { ScoreRing } from "@/components/ui/score-ring";

export default function ScoreRingDemo() {
	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">ScoreRing</h2>
				<div className="flex flex-wrap gap-8">
					<div className="flex flex-col items-center gap-2">
						<ScoreRing score={3.5} />
						<span className="text-sm text-muted-foreground">Score 3.5</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<ScoreRing score={1.2} />
						<span className="text-sm text-muted-foreground">Score 1.2</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<ScoreRing score={7.8} />
						<span className="text-sm text-muted-foreground">Score 7.8</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<ScoreRing score={10} />
						<span className="text-sm text-muted-foreground">Score 10</span>
					</div>
				</div>
			</div>
		</div>
	);
}
