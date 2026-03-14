"use client";

import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";

export default function ToggleDemo() {
	const [isOn, setIsOn] = useState(false);

	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">Toggle</h2>
				<div className="flex flex-wrap items-center gap-8">
					<Toggle
						variant={isOn ? "on" : "default"}
						pressed={isOn}
						onPressedChange={setIsOn}
						label="roast mode"
					/>
					<Toggle variant="on" label="roast mode" />
					<Toggle variant="default" label="roast mode" />
				</div>
			</div>
		</div>
	);
}
