interface Props {
	tech: string[];
}

const techColors: Record<string, string> = {
	'Next.js': 'from-zinc-800 to-zinc-600',
	TypeScript: 'from-blue-600 to-blue-400',
	Tailwind: 'from-cyan-500 to-teal-400',
	'Discord.js': 'from-indigo-600 to-indigo-400',
	'Node.js': 'from-green-600 to-green-400',
};

export function TechCover({ tech }: Props) {
	const gradients = tech.map((t) => techColors[t]).filter(Boolean);

	const gradient = gradients[0] ?? 'from-primary/40 to-primary/10';

	return (
		<div
			className={`h-full w-full bg-linear-to-br ${gradient} flex items-center justify-center`}
		>
			<div className="flex gap-3 opacity-90">
				{tech.slice(0, 3).map((t) => (
					<span key={t} className="rounded-md bg-black/30 px-3 py-1 text-sm text-white">
						{t}
					</span>
				))}
			</div>
		</div>
	);
}
