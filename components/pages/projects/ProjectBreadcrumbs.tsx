import Link from 'next/link';

export function ProjectBreadcrumbs({ title }: { title: string }) {
	return (
		<nav className="text-sm text-muted-foreground">
			<Link href="/#projects" className="hover:text-foreground">
				Projekty
			</Link>
			<span className="mx-2">/</span>
			<span className="text-foreground">{title}</span>
		</nav>
	);
}
