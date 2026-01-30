import { withBasePath } from '@/lib/basePath';
import Image from 'next/image';
import Link from 'next/link';
import { FaDiscord, FaGithub } from 'react-icons/fa6';

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-border bg-background">
			<div className="mx-auto max-w-5xl px-6 py-14">
				{/* TOP */}
				<div className="grid gap-10 lg:grid-cols-3">
					{/* LOGO */}
					<div className="flex flex-col items-center text-center lg:items-start lg:text-left">
						<div className="flex items-center gap-2">
							<Image
								src={withBasePath('/images/thezombiepl.png')}
								alt="THEzombiePL"
								width={36}
								height={36}
							/>
							<span className="text-xl font-bold text-primary">THEzombiePL</span>
						</div>

						<p className="mt-4 max-w-sm text-sm text-muted-foreground">
							Programista z pasją do self-hostingu, tworzenia nowoczesnych aplikacji
							webowych i backendowych oraz wszelkiego rodzaju automatyzacji.
						</p>
					</div>

					{/* NAV + SOCIALS */}
					<div className="grid grid-cols-2 gap-10 lg:col-span-2 lg:grid-cols-2">
						{/* NAV */}
						<div className="text-center lg:text-left">
							<h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
								Nawigacja
							</h4>
							<ul className="grid gap-2 text-sm">
								<li>
									<Link href="/#about" className="hover:text-primary transition">
										O mnie
									</Link>
								</li>
								<li>
									<Link
										href="/#projects"
										className="hover:text-primary transition"
									>
										Projekty
									</Link>
								</li>
								<li>
									<Link
										href="/#contact"
										className="hover:text-primary transition"
									>
										Kontakt
									</Link>
								</li>
							</ul>
						</div>

						{/* SOCIALS */}
						<div className="text-center lg:text-left">
							<h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
								Sociale
							</h4>

							<div className="flex justify-center gap-5 lg:justify-start">
								<Link
									href="https://github.com/THEzombiePL"
									target="_blank"
									aria-label="GitHub"
									className="text-muted-foreground transition hover:text-primary hover:scale-110"
								>
									<FaGithub size={26} />
								</Link>

								<Link
									href="https://discord.gg/MsfFy8ZdJf"
									target="_blank"
									aria-label="Discord"
									className="text-muted-foreground transition hover:text-primary hover:scale-110"
								>
									<FaDiscord size={26} />
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* BOTTOM */}
				<div className="mt-14 flex flex-col items-center gap-2 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
					<span>© {year} THEzombiePL. Wszelkie prawa zastrzeżone.</span>
					<span>
						Built with <span className="text-primary">Next.js</span> &
						<span className="text-primary"> Tailwind CSS</span>
					</span>
				</div>
			</div>
		</footer>
	);
}
