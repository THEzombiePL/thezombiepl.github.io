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
import { Magnetic } from '../animations/Magnetic';
import { RevealStagger, FadeIn, SlideIn } from '../animations/Reveal';

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
		<section id="stack" className="scroll-mt-16 py-16 bg-accent/5 md:scroll-mt-20 md:py-24">
			<RevealStagger>
				<div className="mx-auto max-w-5xl px-6">
					<FadeIn>
						<h2 className="text-3xl font-bold tracking-tight">Stack Technologiczny</h2>
						<p className="mt-4 text-muted-foreground">
							Narzędzia i technologie, których używam na co dzień.
						</p>
					</FadeIn>

					<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{techStack.map((group, i) => (
							<SlideIn direction={i % 2 === 0 ? 'left' : 'right'} key={group.category} className="h-full">
								<div
									className="
										h-full group relative rounded-2xl border border-border bg-background/50 p-6
										backdrop-blur-md transition-all duration-300
										hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5
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
													flex items-center gap-3 text-sm transition-all duration-500
													grayscale opacity-50 
													group-hover:grayscale-0 group-hover:opacity-100
													${item.color}
												`}
											>
												<Magnetic strength={0.2}>
													<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background shadow-sm border border-border/50 group-hover:border-primary/20 transition-colors">
														<item.icon
															aria-hidden="true"
															className="
																h-5 w-5
																transition-transform duration-300
																group-hover:scale-110
																group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]
															"
														/>
													</div>
												</Magnetic>
												<span className="font-medium text-foreground/80">
													{item.name}
												</span>
											</div>
										))}
									</div>
								</div>
							</SlideIn>
						))}
					</div>
				</div>
			</RevealStagger>
		</section>
	);
}
