import Image from 'next/image';
import Link from 'next/link';
import { TechCover } from '@/components/TechCover';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Project } from '@/lib/mdx';
import { withBasePath } from '@/lib/basePath';

const statusConfig = {
	ukonczony: {
		label: 'Ukończony',
		icon: '✔',
		className:
			'bg-primary/80 text-primary-foreground shadow-lg backdrop-blur ring-1 ring-primary/40',
	},
	'w-trakcie': {
		label: 'W trakcie',
		icon: '⏳',
		className: 'bg-yellow-500/80 text-black shadow-lg backdrop-blur ring-1 ring-yellow-500/40',
	},
} as const;

export function ProjectCard({
	slug,
	title,
	description,
	status,
	tech,
	hero,
	featured,
}: Project & { position?: number }) {
	return (
		<Card
			className="
				group relative overflow-hidden
				h-90 w-full
				transition-all duration-300
				hover:-translate-y-1 hover:shadow-xl
			"
		>
			{/* LINK */}
			<Link
				prefetch={false}
				href={`/projekt/${slug}`}
				className="absolute inset-0 z-20"
				aria-label={`Zobacz projekt ${title}`}
			/>

			{/* FEATURED */}
			{featured && (
				<div className="absolute left-3 top-3 z-30">
					<Badge className="bg-primary text-primary-foreground">Featured</Badge>
				</div>
			)}

			{/* STATUS */}
			<div className="absolute right-3 top-3 z-30">
				<div
					className={`
						flex items-center gap-1.5
						rounded-full px-2.5 py-1 text-xs font-medium
						transition-transform duration-300
						group-hover:scale-105
						${statusConfig[status].className}
					`}
				>
					<span className="text-sm">{statusConfig[status].icon}</span>
					<span>{statusConfig[status].label}</span>
				</div>
			</div>
			{/* COVER */}
			<div className="relative h-40 overflow-hidden">
				<div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
					{hero ? (
						<Image
							// src={hero.src}
							src={withBasePath(hero.src)}
							alt={hero.caption ?? title}
							fill
							className="object-cover"
						/>
					) : (
						<TechCover tech={tech} />
					)}
				</div>
			</div>

			{/* BODY */}
			<div className="flex h-50 flex-col px-6 py-4">
				{/* TITLE */}
				<h3 className="mb-2 line-clamp-2 min-h-12 text-lg font-semibold leading-tight">
					{title}
				</h3>

				{/* TAGI */}
				<div className="mb-3 flex min-h-7 gap-2 overflow-hidden">
					{tech.slice(0, 3).map((t) => (
						<Badge key={t} variant="outline" className="text-xs">
							{t}
						</Badge>
					))}
				</div>

				{/* DESCRIPTION */}
				<p className="mt-auto line-clamp-3 text-sm text-muted-foreground">{description}</p>
			</div>

			{/* BORDER GLOW */}
			<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
				<div className="absolute inset-0 rounded-xl ring-1 ring-primary/30" />
			</div>
		</Card>
	);
}
