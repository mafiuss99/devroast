import { Badge } from "@/components/ui/badge";
import { Dot } from "@/components/ui/dot";

export default function BadgeDemo() {
	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">Badge</h2>
				<div className="flex flex-wrap gap-4">
					<Badge variant="critical">
						<Dot variant="critical" />
						critical
					</Badge>
					<Badge variant="warning">
						<Dot variant="warning" />
						warning
					</Badge>
					<Badge variant="good">
						<Dot variant="good" />
						good
					</Badge>
					<Badge variant="verdict">
						<Dot variant="critical" />
						needs_serious_help
					</Badge>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">Dot only</h2>
				<div className="flex flex-wrap gap-4">
					<Dot variant="critical" />
					<Dot variant="warning" />
					<Dot variant="good" />
				</div>
			</div>
		</div>
	);
}
