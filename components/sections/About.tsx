'use client';

import { FadeInSection } from '@/components/FadeInSection';

export function About() {
	return (
		<FadeInSection>
			<section id="about" className="scroll-mt-20 py-24">
				<div className="content">
					<h2 className="mb-4 text-3xl font-bold">O mnie</h2>

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
				</div>
			</section>
		</FadeInSection>
	);
}
