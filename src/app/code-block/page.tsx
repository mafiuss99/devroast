import { CodeBlock } from "@/components/ui/code-block";

const sampleCode = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}`;

export default function CodeBlockDemo() {
	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">CodeBlock</h2>
				<CodeBlock code={sampleCode} filename="calculate.js" />
			</div>
		</div>
	);
}
