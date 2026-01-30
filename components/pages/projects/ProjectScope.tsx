export function ProjectScope({ items }: { items: string[] }) {
	return (
		<section className="space-y-4">
			<h3 className="text-xl font-semibold">Zakres prac</h3>
			<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
				{items.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</section>
	);
}
