'use client';

import type { LucideIcon } from 'lucide-react';
import { Folder, Mail, Menu, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { withBasePath } from '@/lib/basePath';
import { scrollToSection } from '@/lib/scrollToSection';

interface NavLink {
	label: string;
	href: string;
	icon?: LucideIcon | React.ComponentType<{ className?: string }>;
}

const navLinks: NavLink[] = [
	{ label: 'O mnie', href: '/#about', icon: User },
	{ label: 'Projekty', href: '/#projects', icon: Folder },
	{ label: 'Kontakt', href: '/#contact', icon: Mail },
	{
		label: 'Discord',
		href: 'https://discord.gg/MsfFy8ZdJf',
		icon: FaDiscord,
	},
];

function isExternal(href: string) {
	return href.startsWith('http');
}

function getSectionId(href: string): string | null {
	const hashIndex = href.indexOf('#');
	if (hashIndex === -1) return null;
	return href.slice(hashIndex + 1);
}

export function Header({ siteName = 'THEzombiePL' }) {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	const sectionIds = useMemo(() => {
		if (pathname !== '/') return [];
		return navLinks
			.map((link) => getSectionId(link.href))
			.filter((id): id is string => Boolean(id));
	}, [pathname]);

	const active = useScrollSpy(sectionIds);

	return (
		<header className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur border-b border-border">
			<div className="w-full px-6">
				<div className="flex h-16 items-center justify-between">
					{/* LOGO */}
					<Link href="/" className="flex items-center gap-2">
						<Image
							src={withBasePath('/images/thezombiepl.png')}
							alt={siteName}
							width={40}
							height={40}
							className="h-10 w-10 object-contain"
						/>
						<span className="font-bold text-xl text-primary">{siteName}</span>
					</Link>

					{/* DESKTOP NAV */}
					<nav className="hidden md:flex items-center gap-8">
						{navLinks.map((link) => {
							const Icon = link.icon;
							const sectionId = getSectionId(link.href);
							const isActive =
								pathname === '/' && sectionId !== null && sectionId === active;
							const isExternalLink = isExternal(link.href);

							return (
								<Link
									key={link.href}
									href={link.href}
									target={isExternalLink ? '_blank' : undefined}
									rel={isExternalLink ? 'noopener noreferrer' : undefined}
									onClick={(e) => {
										if (!isExternalLink && pathname === '/' && sectionId) {
											e.preventDefault();
											scrollToSection(sectionId);
										}
									}}
									className="relative flex items-center gap-2 py-1 font-medium text-muted-foreground hover:text-primary transition-colors"
								>
									{Icon && <Icon className="w-4 h-4" />}
									<span>{link.label}</span>
									<span
										className={`absolute left-0 -bottom-1 h-0.5 bg-primary transition-[width,opacity] duration-300 ${
											isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
										}`}
									/>
								</Link>
							);
						})}
					</nav>

					{/* MOBILE TOGGLE */}
					<button
						type="button"
						className="md:hidden p-2"
						onClick={() => setOpen((v) => !v)}
						aria-label="Menu"
						aria-expanded={open}
					>
						{open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
					</button>
				</div>
			</div>

			{/* MOBILE NAV */}
			{open && (
				<nav className="md:hidden border-t border-border bg-background">
					<ul className="flex flex-col p-4 gap-4">
						{navLinks.map((link) => {
							const Icon = link.icon;
							const sectionId = getSectionId(link.href);
							const isExternalLink = isExternal(link.href);

							return (
								<li key={link.href}>
									<Link
										href={link.href}
										target={isExternalLink ? '_blank' : undefined}
										rel={isExternalLink ? 'noopener noreferrer' : undefined}
										onClick={(e) => {
											setOpen(false);
											if (!isExternalLink && pathname === '/' && sectionId) {
												e.preventDefault();
												scrollToSection(sectionId);
											}
										}}
										className={`
											flex items-center gap-3 rounded-lg px-3 py-2 transition
											${
												pathname === '/' && sectionId === active
													? 'bg-accent text-primary'
													: 'text-muted-foreground hover:bg-accent hover:text-primary'
											}
										`}
									>
										{Icon && <Icon className="w-5 h-5" />}
										<span>{link.label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			)}
		</header>
	);
}
