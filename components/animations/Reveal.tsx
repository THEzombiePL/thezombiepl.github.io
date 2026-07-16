'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { createContext, type ReactNode, useContext } from 'react';

const RevealStaggerContext = createContext(false);

const viewport = { once: true, margin: '0px 0px -100px' };

export function RevealStagger({
	children,
	faster = false,
}: {
	children: ReactNode;
	faster?: boolean;
}) {
	return (
		<RevealStaggerContext.Provider value={true}>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={viewport}
				transition={{ staggerChildren: faster ? 0.15 : 0.25 }}
			>
				{children}
			</motion.div>
		</RevealStaggerContext.Provider>
	);
}

// Fade in from bottom
export function FadeIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
	const shouldReduceMotion = useReducedMotion();
	const isInStaggerGroup = useContext(RevealStaggerContext);

	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
				visible: { opacity: 1, y: 0 },
			}}
			transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isInStaggerGroup ? 0 : delay }}
			{...(isInStaggerGroup
				? {}
				: {
						initial: 'hidden',
						whileInView: 'visible',
						viewport,
					})}
			className={className}
		>
			{children}
		</motion.div>
	);
}

// Scale in from slightly smaller
export function ScaleIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
	const shouldReduceMotion = useReducedMotion();
	const isInStaggerGroup = useContext(RevealStaggerContext);

	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.85, y: shouldReduceMotion ? 0 : 20 },
				visible: { opacity: 1, scale: 1, y: 0 },
			}}
			transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isInStaggerGroup ? 0 : delay }}
			{...(isInStaggerGroup
				? {}
				: {
						initial: 'hidden',
						whileInView: 'visible',
						viewport,
					})}
			className={className}
		>
			{children}
		</motion.div>
	);
}

// Blur in
export function BlurIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
	const shouldReduceMotion = useReducedMotion();
	const isInStaggerGroup = useContext(RevealStaggerContext);

	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, filter: shouldReduceMotion ? 'blur(0px)' : 'blur(15px)', y: shouldReduceMotion ? 0 : 10 },
				visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
			}}
			transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: isInStaggerGroup ? 0 : delay }}
			{...(isInStaggerGroup
				? {}
				: {
						initial: 'hidden',
						whileInView: 'visible',
						viewport,
					})}
			className={className}
		>
			{children}
		</motion.div>
	);
}

// Slide in from left or right
export function SlideIn({ children, className = '', direction = 'left', delay = 0 }: { children: ReactNode; className?: string; direction?: 'left' | 'right'; delay?: number }) {
	const shouldReduceMotion = useReducedMotion();
	const isInStaggerGroup = useContext(RevealStaggerContext);

	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, x: shouldReduceMotion ? 0 : direction === 'left' ? -50 : 50 },
				visible: { opacity: 1, x: 0 },
			}}
			transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isInStaggerGroup ? 0 : delay }}
			{...(isInStaggerGroup
				? {}
				: {
						initial: 'hidden',
						whileInView: 'visible',
						viewport,
					})}
			className={className}
		>
			{children}
		</motion.div>
	);
}
