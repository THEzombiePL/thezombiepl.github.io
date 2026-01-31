'use client';

import { FaCloud, FaGears, FaRobot, FaServer } from 'react-icons/fa6';
import { FadeInSection } from '@/components/FadeInSection';

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
		<section className="py-24">
			<FadeInSection>
				<div className="mx-auto max-w-5xl px-6">
					<h2 className="text-3xl font-bold">Specjalizacja</h2>
					<p className="mt-4 text-muted-foreground">Tym zajmuję się na co dzień.</p>

					<div className="mt-12 grid gap-6 sm:grid-cols-2">
						{items.map((item) => (
							<div
								key={item.title}
								className="
									rounded-2xl border border-border bg-background/80 p-6
									transition-all
									hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5
								"
							>
								<div className="mb-4 text-primary">
									<item.icon className="h-7 w-7" />
								</div>

								<h3 className="mb-2 font-semibold">{item.title}</h3>

								<p className="text-sm text-muted-foreground">{item.desc}</p>
							</div>
						))}
					</div>
				</div>
			</FadeInSection>
		</section>
	);
}
