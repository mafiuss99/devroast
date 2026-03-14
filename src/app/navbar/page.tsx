import { Navbar } from "@/components/ui/navbar";

export default function NavbarDemo() {
	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">Navbar</h2>
				<Navbar />
			</div>

			<div className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">Navbar with custom links</h2>
				<Navbar
					links={[
						{ label: "home", href: "/" },
						{ label: "leaderboard", href: "/leaderboard" },
						{ label: "about", href: "/about" },
					]}
				/>
			</div>
		</div>
	);
}
