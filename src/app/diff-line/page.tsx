import {
	DiffLine,
	DiffLineRoot,
	DiffLinePrefix,
	DiffLineCode,
} from "@/components/ui/diff-line";

export default function DiffLineDemo() {
	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">DiffLine (props)</h2>
				<div className="w-[560px] rounded-md border border-border-primary bg-bg-input">
					<DiffLine type="removed" code="var total = 0;" />
					<DiffLine type="added" code="const total = 0;" />
					<DiffLine
						type="context"
						code="for (let i = 0; i < items.length; i++) {"
					/>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">DiffLine (composition)</h2>
				<div className="w-[560px] rounded-md border border-border-primary bg-bg-input">
					<DiffLineRoot type="removed">
						<DiffLinePrefix type="removed" />
						<DiffLineCode type="removed">var total = 0;</DiffLineCode>
					</DiffLineRoot>
					<DiffLineRoot type="added">
						<DiffLinePrefix type="added" />
						<DiffLineCode type="added">const total = 0;</DiffLineCode>
					</DiffLineRoot>
					<DiffLineRoot type="context">
						<DiffLinePrefix type="context" />
						<DiffLineCode type="context">
							for (let i = 0; i &lt; items.length; i++) {"{"}
						</DiffLineCode>
					</DiffLineRoot>
				</div>
			</div>
		</div>
	);
}
