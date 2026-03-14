import { Button, buttonVariants } from "@/components/ui/button";

export default function ButtonDemo() {
	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">Variants</h2>
				<div className="flex flex-wrap gap-4">
					<Button variant="default">Default</Button>
					<Button variant="destructive">Destructive</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="link">Link</Button>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">Sizes</h2>
				<div className="flex flex-wrap items-center gap-4">
					<Button size="sm">Small</Button>
					<Button size="default">Default</Button>
					<Button size="lg">Large</Button>
					<Button size="icon">Icon</Button>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">States</h2>
				<div className="flex flex-wrap gap-4">
					<Button>Default</Button>
					<Button disabled>Disabled</Button>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">With className</h2>
				<div className="flex flex-wrap gap-4">
					<Button className="w-48">Custom Width</Button>
					<Button variant="outline" className="border-2 border-accent-green">
						Custom Border
					</Button>
				</div>
			</div>
		</div>
	);
}
