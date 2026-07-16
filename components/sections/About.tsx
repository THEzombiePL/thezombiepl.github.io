'use client';

import { RevealStagger, FadeIn } from '../animations/Reveal';

export function About() {
	return (
		<section id="about" className="scroll-mt-16 py-16 md:scroll-mt-20 md:py-24">
			<RevealStagger>
				<div className="mx-auto max-w-5xl px-6">
					<FadeIn>
						<h2 className="mb-6 text-3xl font-bold tracking-tight">O mnie</h2>
					</FadeIn>

					<FadeIn>
						<p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
							Jestem programistą skupionym na tworzeniu nowoczesnych aplikacji webowych
							oraz backendów. Lubię budować kompletne rozwiązania - od API i logiki
							serwerowej, przez automatyzacje, aż po deployment i utrzymanie
							infrastruktury.
							<br />
							<br />
							Na co dzień pracuję z Next.js, TypeScript i Node.js. Interesuję się
							devopsem, self-hostingiem, automatyzacjami (n8n) oraz tworzeniem botów
							Discord i prostych narzędzi, które realnie ułatwiają pracę.
						</p>
					</FadeIn>
				</div>
			</RevealStagger>
		</section>
	);
}
