import Link from 'next/link';
import { FadeInSection } from '@/components/FadeInSection';
import { FaDiscord, FaEnvelope, FaServer } from 'react-icons/fa6';
import { LightRays } from '../LightRays';

export function Contact() {
	return (
		<FadeInSection delay={0.05}>
			<section id="contact" className="relative overflow-hidden py-32 scroll-mt-20 ">
				
				<div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
				<LightRays 
					direction="up" 
					color="var(--primary)" 
					className="opacity-20" 
					length="60vh"
					count={5}
				/>

				<div className="relative mx-auto max-w-4xl px-6 text-center">
					<h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
						Zostańmy w <span className="text-primary">kontakcie</span>
					</h2>

					<p className="mx-auto mb-12 max-w-md text-muted-foreground">
						Masz pytanie lub propozycję współpracy? Odezwij się do mnie najszybciej przez Discorda lub mailowo.
					</p>

					<div className="grid gap-4 sm:grid-cols-3">
						{/* DISCORD */}
						<ContactCard
							href="https://discord.com/users/617421492744880159"
							icon={<FaDiscord className="text-2xl" />}
							label="Discord"
							value="thezombiepl"
						/>

						{/* SERWER */}
						<ContactCard
							href="https://discord.gg/MsfFy8ZdJf"
							icon={<FaServer className="text-2xl" />}
							label="Serwer"
							value="GamingZone"
						/>

						{/* MAIL */}
						<ContactCard
							href="mailto:kontakt@zombiebot.pl"
							icon={<FaEnvelope className="text-2xl" />}
							label="Email"
							value="kontakt@zombiebot.pl"
						/>
					</div>
				</div>
			</section>
		</FadeInSection>
	);
}

function ContactCard({ href, icon, label, value }: { href: string; icon: React.ReactNode; label: string; value: string }) {
	return (
		<Link
			href={href}
			target="_blank"
			className="group relative flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/[0.03]"
			// className="group relative flex flex-col items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/[0.03]"
		>
			<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
				{icon}
			</div>
			<div className="flex flex-col">
				<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
					{label}
				</span>
				<span className="text-sm font-medium text-foreground">
					{value}
				</span>
			</div>
			
			<div className="absolute inset-0 -z-10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20 bg-primary" />
		</Link>
	);
}