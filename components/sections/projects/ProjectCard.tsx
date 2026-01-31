import Image from 'next/image';
import Link from 'next/link';
import { TechCover } from '@/components/TechCover';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Project } from '@/lib/mdx';
import { withBasePath } from '@/lib/basePath';
import { FaCheck, FaHourglassHalf } from 'react-icons/fa6';

const statusConfig = {
	ukonczony: {
		label: 'Ukończony',
		icon: <FaCheck className="text-[10px]" />,
		className:
			'bg-primary text-primary-foreground shadow-lg backdrop-blur-md ring-1 ring-primary/40',
	},
	'w-trakcie': {
		label: 'W trakcie',
		icon: <FaHourglassHalf className="text-[10px]" />,
		className: 'bg-yellow-500 text-black shadow-lg backdrop-blur-md ring-1 ring-yellow-500/40',
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
				h-90 w-full bg-card
				transition-all duration-500
				hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)]
				border-primary/10 hover:border-primary/40
			"
		>
			{/* BG ON HOVER */}
			<div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
				{/* <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" /> */}
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
			<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
				<div className="absolute inset-0 rounded-xl ring-2 ring-primary/20 blur-[2px]" />
			</div>
		</Card>
	);
}
