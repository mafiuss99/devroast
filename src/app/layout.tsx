import "./globals.css";
import { Navbar } from "@/components/ui/navbar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-bg-page">
				<Navbar />
				<main className="mx-auto flex max-w-[1200px] flex-col px-10">
					{children}
				</main>
			</body>
		</html>
	);
}
