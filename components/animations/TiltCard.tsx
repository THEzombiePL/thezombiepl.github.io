'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { type ReactNode, useRef } from 'react';

interface TiltCardProps {
	children: ReactNode;
	className?: string;
	rotationAmount?: number;
}

export function TiltCard({ children, className = '', rotationAmount = 15 }: TiltCardProps) {
	const ref = useRef<HTMLDivElement>(null);

	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
	const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

	const rotateX = useMotionTemplate`${mouseYSpring}deg`;
	const rotateY = useMotionTemplate`${mouseXSpring}deg`;

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();

		const width = rect.width;
		const height = rect.height;

		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		const xPct = mouseX / width - 0.5;
		const yPct = mouseY / height - 0.5;

		x.set(xPct * rotationAmount);
		y.set(yPct * -rotationAmount);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			ref={ref}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				rotateX,
				rotateY,
				transformStyle: 'preserve-3d',
			}}
			className={className}
		>
			<div
				style={{
					transform: 'translateZ(20px)',
				}}
				className="h-full w-full"
			>
				{children}
			</div>
		</motion.div>
	);
}
