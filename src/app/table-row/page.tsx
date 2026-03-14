import {
	TableRow,
	RankCell,
	ScoreCell,
	CodeCell,
	LangCell,
} from "@/components/ui/table-row";

const leaderboardData = [
	{
		rank: 1,
		score: 2.1,
		code: "function calculateTotal(items) { var total = 0; ...",
		lang: "javascript",
	},
	{ rank: 2, score: 3.5, code: "const foo = 'bar'", lang: "javascript" },
	{
		rank: 3,
		score: 4.8,
		code: "function hello() { return 'world'; }",
		lang: "javascript",
	},
];

export default function TableRowDemo() {
	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">TableRow</h2>
				<div className="w-full max-w-2xl">
					{leaderboardData.map((item) => (
						<TableRow key={item.rank}>
							<RankCell rank={item.rank} />
							<ScoreCell>{item.score}</ScoreCell>
							<CodeCell>{item.code}</CodeCell>
							<LangCell>{item.lang}</LangCell>
						</TableRow>
					))}
				</div>
			</div>
		</div>
	);
}
