import * as React from "react";
import Link from "next/link";

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
	links?: { label: string; href: string }[];
}

function Navbar({ className, links = [], ...props }: NavbarProps) {
	return (
		<nav
			className={`flex h-14 items-center border-b border-border-primary px-6 ${className ?? ""}`}
			{...props}
		>
			<Logo />
			<div className="flex-1" />
			{links.map((link) => (
				<NavLink key={link.href} href={link.href}>
					{link.label}
				</NavLink>
			))}

			{links.length === 0 && <NavLink href="/leaderboard">leaderboard</NavLink>}
		</nav>
	);
}

function Logo({ className }: { className?: string }) {
	return (
		<div className={`flex items-center gap-2 ${className ?? ""}`}>
			<span className="text-xl font-bold text-accent-green">&gt;</span>
			<span className="text-lg font-medium text-card-foreground">devroast</span>
		</div>
	);
}

function NavLink({
	href,
	className,
	...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
	return (
		<Link
			href={href ?? "#"}
			className={`text-sm text-muted-foreground hover:text-card-foreground ${className ?? ""}`}
			{...props}
		/>
	);
}

export { Navbar, Logo, NavLink };
