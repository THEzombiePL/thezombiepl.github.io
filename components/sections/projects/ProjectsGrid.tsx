'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Project } from '@/lib/mdx';
import { HydrationSkeleton } from './HydrationSkeleton';
import { ProjectCard } from './ProjectCard';

interface Props {
	projects: Project[];
}

const containerVariants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.12,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};

export function ProjectsGrid({ projects }: Props) {
	const prefersReducedMotion = useReducedMotion();
	const shouldAnimate = !prefersReducedMotion;

	return (
		<motion.div
			className="
				grid gap-8
				grid-cols-1
				sm:grid-cols-2
				lg:grid-cols-3
				items-stretch
			"
			variants={shouldAnimate ? containerVariants : undefined}
			initial={shouldAnimate ? 'hidden' : undefined}
			whileInView={shouldAnimate ? 'show' : undefined}
			viewport={{ once: true }}
		>
			{projects.map((project) => (
				<motion.div key={project.slug} variants={shouldAnimate ? itemVariants : undefined}>
					<HydrationSkeleton>
						<ProjectCard {...project} />
					</HydrationSkeleton>
				</motion.div>
			))}
		</motion.div>
	);
}
