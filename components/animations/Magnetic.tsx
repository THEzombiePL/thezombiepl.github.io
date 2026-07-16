'use client';

import { motion, useSpring } from 'framer-motion';
import { type ReactNode, useRef } from 'react';

interface MagneticProps {
	children: ReactNode;
	className?: string;
	strength?: number;
}

export function Magnetic({ children, className = '', strength = 0.5 }: MagneticProps) {
	const ref = useRef<HTMLDivElement>(null);

	const x = useSpring(0, { stiffness: 300, damping: 20, mass: 0.5 });
	const y = useSpring(0, { stiffness: 300, damping: 20, mass: 0.5 });

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const mouseX = e.clientX - rect.left - rect.width / 2;
		const mouseY = e.clientY - rect.top - rect.height / 2;

		x.set(mouseX * strength);
		y.set(mouseY * strength);
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
			style={{ x, y }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
