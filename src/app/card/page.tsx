import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dot } from "@/components/ui/dot";

export default function CardDemo() {
	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">Card</h2>
				<Card>
					<CardHeader>
						<Badge variant="critical">
							<Dot variant="critical" />
							critical
						</Badge>
					</CardHeader>
					<CardContent>
						<CardTitle>using var instead of const/let</CardTitle>
						<CardDescription>
							the var keyword is function-scoped and can lead to unexpected
							behavior. Use const or let instead for block-scoping.
						</CardDescription>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
