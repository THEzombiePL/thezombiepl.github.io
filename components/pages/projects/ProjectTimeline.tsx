export function ProjectTimeline({ items }: { items: { label: string; date: string }[] }) {
	return (
		<section className="space-y-4">
			<h3 className="text-xl font-semibold">Timeline</h3>

			<div className="space-y-3 border-l pl-4">
				{items.map((item) => (
					<div key={item.label}>
						<div className="text-sm font-medium">{item.label}</div>
						<div className="text-xs text-muted-foreground">{item.date}</div>
					</div>
				))}
			</div>
		</section>
	);
}
