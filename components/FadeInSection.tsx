'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInSectionProps {
	children: ReactNode;
	delay?: number;
}

const variants = {
	hidden: { opacity: 0 },
	show: { opacity: 1 },
};

export function FadeInSection({ children, delay = 0 }: FadeInSectionProps) {
	const prefersReducedMotion = useReducedMotion();
	const shouldAnimate = !prefersReducedMotion;

	return (
		<motion.div
			variants={shouldAnimate ? variants : undefined}
			initial={shouldAnimate ? 'hidden' : undefined}
			whileInView={shouldAnimate ? 'show' : undefined}
			viewport={{ once: true, margin: '-20px' }}
			transition={{
				duration: 0.8,
				ease: [0.21, 0.47, 0.32, 0.98],
				delay,
			}}
		>
			{children}
		</motion.div>
	);
}
