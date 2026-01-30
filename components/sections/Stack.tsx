'use client';

import { FaDiscord, FaServer } from 'react-icons/fa6';
import {
	SiDocker,
	SiFramer,
	SiLinux,
	SiMongodb,
	SiNextdotjs,
	SiNodedotjs,
	SiPayloadcms,
	SiPostgresql,
	SiTailwindcss,
	SiTypescript,
} from 'react-icons/si';
import { FadeInSection } from '@/components/FadeInSection';

const techStack = [
	{
		category: 'Frontend',
		items: [
			{
				name: 'Next.js',
				icon: SiNextdotjs,
				color: 'text-white',
			},
			{
				name: 'TypeScript',
				icon: SiTypescript,
				color: 'text-[#3178C6]',
			},
			{
				name: 'Tailwind',
				icon: SiTailwindcss,
				color: 'text-[#06B6D4]',
			},
			{
				name: 'Framer Motion',
				icon: SiFramer,
				color: 'text-[#0055FF]',
			},
		],
	},
	{
		category: 'Backend & DB',
		items: [
			{
				name: 'Node.js',
				icon: SiNodedotjs,
				color: 'text-[#339933]',
			},
			{
				name: 'PostgreSQL',
				icon: SiPostgresql,
				color: 'text-[#4169E1]',
			},
			{
				name: 'MongoDB',
				icon: SiMongodb,
				color: 'text-[#47A248]',
			},
			{
				name: 'Payload CMS',
				icon: SiPayloadcms,
				color: 'text-white',
			},
		],
	},
	{
		category: 'DevOps & Tools',
		items: [
			{
				name: 'Docker',
				icon: SiDocker,
				color: 'text-[#2496ED]',
			},
			{
				name: 'Discord.js',
				icon: FaDiscord,
				color: 'text-[#5865F2]',
			},
			{
				name: 'Linux',
				icon: SiLinux,
				color: 'text-[#FCC624]',
			},
			{
				name: 'Coolify',
				icon: FaServer,
				color: 'text-[#8c52ff]',
			},
		],
	},
];

export function Stack() {
	return (
		<section id="stack" className="scroll-mt-20 py-24 bg-accent/5">
			<FadeInSection>
				<div className="mx-auto max-w-5xl px-6">
					<h2 className="text-3xl font-bold">Stack Technologiczny</h2>
					<p className="mt-4 text-muted-foreground">
						Narzędzia i technologie, których używam na co dzień.
					</p>

					<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{techStack.map((group) => (
							<div
								key={group.category}
								className="
									rounded-2xl border border-border bg-background/80 p-6
									transition-all
									hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5
								"
							>
								<h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
									{group.category}
								</h3>

								<div className="grid gap-4">
									{group.items.map((item) => (
										<div
											key={item.name}
											className={`
												group flex items-center gap-3
												text-sm 
												transition-colors duration-300
												${item.color}
											`}
										>
											<item.icon
												className="
												h-6 w-6
												transition-transform duration-200
												group-hover:scale-110
												group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.35)]
											"
											/>
											<span className="font-medium text-foreground/80">
												{item.name}
											</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</FadeInSection>
		</section>
	);
}
