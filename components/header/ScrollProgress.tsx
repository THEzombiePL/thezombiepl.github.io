'use client';

import { type MotionProps, motion, useScroll } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollProgressProps extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
	ref?: React.Ref<HTMLDivElement>;
}

export function ScrollProgress({ className, ref, ...props }: ScrollProgressProps) {
	const { scrollYProgress } = useScroll();

	return (
		<motion.div
			ref={ref}
			aria-hidden
			className={cn(
				'pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[2px] origin-left rounded-full bg-primary/90',
				className,
			)}
			style={{
				scaleX: scrollYProgress,
			}}
			{...props}
		/>
	);
}
