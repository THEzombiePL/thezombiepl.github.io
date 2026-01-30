'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export function Hero() {
	const prefersReducedMotion = useReducedMotion();
	const shouldAnimate = !prefersReducedMotion;

	const { scrollY } = useScroll();

	const y = useTransform(scrollY, [0, 300], [0, shouldAnimate ? 40 : 0]);

	return (
		<section className="relative pt-32 pb-24 overflow-hidden">
			{/* PARALLAX BG */}
			<motion.div
				style={{ y }}
				className="
					pointer-events-none absolute inset-0
					bg-[radial-gradient(circle_at_50%_35%,rgba(34,197,94,0.06),transparent_65%)]
				"
			/>
			<div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-linear-to-b from-transparent to-background" />
			<div className="relative mx-auto max-w-3xl px-6 text-center">
				<h1 className="text-5xl font-bold leading-tight">
					Hej, jestem <span className="text-primary">THEzombiePL</span>
				</h1>

				<p className="mt-6 text-xl text-muted-foreground">
					Tworzę nowoczesne aplikacje webowe, backendy i automatyzacje. Pracuję głównie z
					Next.js, TypeScript, Node.js oraz infrastrukturą self-hosted.
				</p>

				<div className="mt-10 flex justify-center gap-6">
					<a
						href="#projects"
						className="rounded-lg bg-primary px-6 py-3 text-primary-foreground"
					>
						Zobacz projekty
					</a>

					<a href="#contact" className="rounded-lg border border-primary px-6 py-3">
						Kontakt
					</a>
				</div>
			</div>
		</section>
	);
}
