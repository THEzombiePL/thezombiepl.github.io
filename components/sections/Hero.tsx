'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { scrollToSection } from '@/lib/scrollToSection';
import { LightRays } from '../LightRays';
import { RevealStagger, BlurIn, FadeIn, ScaleIn } from '../animations/Reveal';

export function Hero() {
	const prefersReducedMotion = useReducedMotion();
	const shouldAnimate = !prefersReducedMotion;

	const { scrollY } = useScroll();

	const y = useTransform(scrollY, [0, 300], [0, shouldAnimate ? 40 : 0]);

	return (
		<section className="relative -mt-12 sm:-mt-14 md:-mt-16 pt-44 sm:pt-[11.5rem] md:pt-48 pb-24 overflow-hidden">
			{/* LIGHT RAYS */}
			<LightRays color="var(--primary)" className="opacity-20" />

			{/* SUBTLE RADIAL GLOW */}
			<motion.div
				style={{ y }}
				className="pointer-events-none absolute inset-0
				bg-[radial-gradient(circle_at_50%_35%,color-mix(in_srgb,var(--primary),transparent_94%),transparent_65%)]
				"
			/>
			<div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-linear-to-b from-transparent to-background" />
			<div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
				<RevealStagger faster>
					<BlurIn>
						<h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
							Hej, jestem <span className="text-primary inline-block">THEzombiePL</span>
						</h1>
					</BlurIn>

					<FadeIn>
						<p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
							Tworzę nowoczesne aplikacje webowe, backendy i automatyzacje. Pracuję głównie z
							Next.js, TypeScript, Node.js oraz infrastrukturą self-hosted.
						</p>
					</FadeIn>

					<ScaleIn>
						<div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								type="button"
								onClick={() => scrollToSection('projects')}
								className="cursor-pointer rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-[0_0_24px_-4px_rgba(var(--primary),0.3)] transition-shadow hover:shadow-[0_0_32px_-4px_rgba(var(--primary),0.5)]"
							>
								Zobacz projekty
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								type="button"
								onClick={() => scrollToSection('contact')}
								className="cursor-pointer rounded-full border border-primary/40 bg-background/50 px-8 py-4 font-semibold backdrop-blur-sm transition-colors hover:border-primary/80 hover:bg-primary/10"
							>
								Kontakt
							</motion.button>
						</div>
					</ScaleIn>
				</RevealStagger>
			</div>
		</section>
	);
}
