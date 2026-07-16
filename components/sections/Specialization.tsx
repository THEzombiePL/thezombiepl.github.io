'use client';

import { FaCloud, FaGears, FaRobot, FaServer } from 'react-icons/fa6';
import { TiltCard } from '../animations/TiltCard';
import { RevealStagger, FadeIn, ScaleIn } from '../animations/Reveal';

const items = [
	{
		title: 'Aplikacje webowe',
		desc: 'Nowoczesne aplikacje w Next.js i TypeScript, od MVP po produkcję.',
		icon: FaCloud,
	},
	{
		title: 'Backend & API',
		desc: 'Projektowanie i implementacja API, logiki serwerowej i baz danych.',
		icon: FaServer,
	},
	{
		title: 'Boty Discord',
		desc: 'Boty Discord w discord.js – automatyzacje, integracje, custom logika.',
		icon: FaRobot,
	},
	{
		title: 'Automatyzacje & DevOps',
		desc: 'Self-hosting, Docker, n8n, deployment i utrzymanie usług.',
		icon: FaGears,
	},
];

export function Specialization() {
	return (
		<section id="specialization" className="scroll-mt-16 py-16 md:scroll-mt-20 md:py-24">
			<RevealStagger>
				<div className="mx-auto max-w-5xl px-4 sm:px-6">
					<FadeIn>
						<h2 className="text-2xl font-bold sm:text-3xl tracking-tight">Specjalizacja</h2>
						<p className="mt-3 text-muted-foreground sm:mt-4">
							Tym zajmuję się na co dzień.
						</p>
					</FadeIn>

					<div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 perspective-1000">
						{items.map((item) => (
							<ScaleIn key={item.title} className="h-full">
								<TiltCard rotationAmount={25} className="h-full group">
									<div
										className="
											h-full rounded-2xl border border-border bg-background/80 p-6
											transition-all duration-300
											group-hover:border-primary/40 group-hover:bg-primary/[0.03] group-hover:shadow-2xl group-hover:shadow-primary/10
										"
									>
										<div className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 origin-left">
											<item.icon className="h-7 w-7 drop-shadow-sm" />
										</div>

										<h3 className="mb-2 font-semibold text-lg">{item.title}</h3>

										<p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
									</div>
								</TiltCard>
							</ScaleIn>
						))}
					</div>
				</div>
			</RevealStagger>
		</section>
	);
}
