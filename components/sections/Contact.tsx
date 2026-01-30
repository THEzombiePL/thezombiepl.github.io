import Link from 'next/link';
import { FadeInSection } from '@/components/FadeInSection';

export function Contact() {
	return (
		<FadeInSection delay={0.05}>
			<section id="contact" className="relative overflow-hidden py-24 scroll-mt-20">
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute bottom-0 h-80 w-full animate-gradient bg-linear-to-t from-primary/20 via-primary/5 to-transparent" />
				</div>

				<div className="relative mx-auto max-w-2xl px-6 text-center">
					<h2 className="mb-6 text-3xl font-bold">Kontakt</h2>

					<p className="mb-10 text-lg text-muted-foreground">
						Najłatwiej skontaktujesz się ze mną przez Discorda lub mailowo.
					</p>

					<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
						<Link
							href="https://discord.com/users/617421492744880159"
							target="_blank"
							className="rounded-lg border px-6 py-3 hover:bg-accent transition"
						>
							Discord: thezombiepl
						</Link>

						<Link
							href="https://discord.gg/MsfFy8ZdJf"
							target="_blank"
							className="rounded-lg border px-6 py-3 hover:bg-accent transition"
						>
							Serwer: GamingZone
						</Link>

						<Link
							href="mailto:kontakt@zombiebot.pl"
							className="rounded-lg border px-6 py-3 hover:bg-accent transition"
						>
							Mail: kontakt@zombiebot.pl
						</Link>
					</div>
				</div>
			</section>
		</FadeInSection>
	);
}
