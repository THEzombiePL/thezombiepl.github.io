'use client';

import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useReducedMotion,
	useScroll,
} from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Folder, Mail, Menu, User, X } from 'lucide-react';
import Image from 'next-export-optimize-images/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaDiscord } from 'react-icons/fa6';
import { type SectionSpyEntry, useScrollSpy } from '@/hooks/useScrollSpy';
import { withBasePath } from '@/lib/basePath';
import { lockDocumentScroll, scrollToSection, unlockDocumentScroll } from '@/lib/scrollToSection';
import { cn } from '@/lib/utils';
import { ScrollProgress } from './ScrollProgress';

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

/**
 * Page sections in document order.
 * Specjalizacja + Stack are not in the menu → keep "O mnie" highlighted.
 */
const spySections: SectionSpyEntry[] = [
	{ id: 'about', navId: 'about' },
	{ id: 'specialization', navId: 'about' },
	{ id: 'stack', navId: 'about' },
	{ id: 'projects', navId: 'projects' },
	{ id: 'contact', navId: 'contact' },
];

const springConfig = {
	type: 'spring' as const,
	stiffness: 280,
	damping: 24,
	mass: 0.8,
};

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
	const [isFloating, setIsFloating] = useState(false);
	const pathname = usePathname();
	const reduceMotion = useReducedMotion();
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, 'change', (y) => {
		if (open) return;
		const next = y > 16;
		setIsFloating((prev) => (prev === next ? prev : next));
	});

	const closeMenu = useCallback(() => {
		setOpen(false);
	}, []);

	const openMenu = useCallback(() => {
		setOpen(true);
	}, []);

	// iOS-safe body lock while mobile menu is open.
	// Only lock/unlock via this effect's setup+cleanup (no unlock on open===false mount),
	// so we don't clobber scrollY with a second unlock after restore.
	useEffect(() => {
		if (!open) return;

		lockDocumentScroll();
		return () => {
			unlockDocumentScroll();
		};
	}, [open]);

	// Escape closes menu
	useEffect(() => {
		if (!open) return;

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeMenu();
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [open, closeMenu]);

	// Close when growing to desktop nav breakpoint
	useEffect(() => {
		const mq = window.matchMedia('(min-width: 1024px)');
		const onChange = () => {
			if (mq.matches) closeMenu();
		};
		onChange();
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	}, [closeMenu]);

	const sections = useMemo(() => (pathname === '/' ? spySections : []), [pathname]);

	const active = useScrollSpy(sections);

	const goToSection = useCallback((sectionId: string) => {
		// Close menu first (effect cleanup unlocks with restore:false already
		// handled inside scrollToSection so we don't get restore→scroll twice).
		setOpen(false);
		scrollToSection(sectionId);
	}, []);

	return (
		<header data-site-header className="pointer-events-none fixed inset-x-0 top-0 z-50">
			{/* Full-screen backdrop - mobile / tablet drawer */}
			<AnimatePresence>
				{open && (
					<motion.div
						key="mobile-nav-backdrop"
						role="presentation"
						initial={reduceMotion ? false : { opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={reduceMotion ? undefined : { opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="pointer-events-auto fixed inset-0 z-40 touch-none overscroll-none bg-black/50 backdrop-blur-[2px] lg:hidden"
						onPointerDown={(e) => {
							e.preventDefault();
							closeMenu();
						}}
					/>
				)}
			</AnimatePresence>

			{/* Outer pad drives the float inset */}
			<div
				className={cn(
					'pointer-events-auto relative z-50 mx-auto w-full transition-[padding] duration-500 ease-out',
					isFloating ? 'px-3 pt-3 sm:px-4 sm:pt-4' : 'px-0 pt-0'
				)}
			>
				<div
					className={cn(
						'relative mx-auto overflow-hidden border backdrop-blur-3xl',
						'transition-[max-width,border-radius,background-color,border-color,box-shadow] duration-500 ease-out',
						isFloating
							? 'max-w-[880px] border-primary/20 bg-background/85 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]'
							: 'max-w-full border-transparent border-b-border/40 bg-background/60 shadow-none',
						open
							? isFloating
								? 'rounded-[24px]'
								: 'rounded-none rounded-b-[24px]'
							: isFloating
								? 'rounded-full'
								: 'rounded-none'
					)}
				>
					<div
						aria-hidden
						className={cn(
							'pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent transition-opacity duration-500',
							isFloating ? 'opacity-100' : 'opacity-0',
						)}
					/>

					<div className="relative w-full px-3 sm:px-4 md:px-6">
						<div
							data-site-header-bar
							className="relative flex h-12 items-center justify-between sm:h-14 md:h-16"
						>
							{/* LOGO */}
							<Link
								href="/"
								className="group relative z-10 flex min-h-10 min-w-0 items-center gap-1.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:min-h-11 sm:gap-2"
								onClick={closeMenu}
							>
								<Image
									src={withBasePath('/images/thezombiepl.webp')}
									alt={siteName}
									width={40}
									height={40}
									className="h-8 w-8 shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.04] sm:h-9 sm:w-9 md:h-10 md:w-10"
								/>
								<span className="truncate font-bold text-base text-primary sm:text-lg md:text-xl">
									{siteName}
								</span>
							</Link>

							{/* DESKTOP NAV - lg+ so tablets keep the drawer (avoids overflow) */}
							<nav className="hidden items-center lg:flex">
								<ul className="flex items-center gap-0.5 xl:gap-1">
									{navLinks.map((link) => {
										const Icon = link.icon;
										const sectionId = getSectionId(link.href);
										const isExternalLink = isExternal(link.href);
										const isActive =
											!isExternalLink &&
											pathname === '/' &&
											sectionId !== null &&
											sectionId === active;

										return (
											<li key={link.href} className="relative">
												<Link
													href={link.href}
													target={isExternalLink ? '_blank' : undefined}
													rel={
														isExternalLink
															? 'noopener noreferrer'
															: undefined
													}
													onClick={(e) => {
														if (
															!isExternalLink &&
															pathname === '/' &&
															sectionId
														) {
															e.preventDefault();
															goToSection(sectionId);
														}
													}}
													className={cn(
														'relative flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-medium text-sm transition-colors duration-300 xl:gap-2 xl:px-3.5 xl:py-2',
														isActive
															? 'text-primary'
															: 'text-muted-foreground hover:text-foreground',
													)}
												>
													{isActive &&
														(reduceMotion ? (
															<span className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-primary/20" />
														) : (
															<motion.span
																layoutId="nav-active-pill"
																className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-primary/20"
																transition={springConfig}
															/>
														))}
													{Icon && (
														<Icon className="relative z-10 h-4 w-4 shrink-0" />
													)}
													<span className="relative z-10 whitespace-nowrap">
														{link.label}
													</span>
												</Link>
											</li>
										);
									})}
								</ul>
							</nav>

							{/* MOBILE / TABLET TOGGLE */}
							<button
								type="button"
								className={cn(
									'relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full sm:h-11 sm:w-11 lg:hidden',
									'text-foreground transition-colors duration-200',
									'hover:bg-accent/80 active:scale-95',
									'outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
								)}
								onClick={() => (open ? closeMenu() : openMenu())}
								aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
								aria-expanded={open}
								aria-controls="mobile-nav"
							>
								<span className="sr-only">
									{open ? 'Zamknij menu' : 'Otwórz menu'}
								</span>
								<AnimatePresence mode="wait" initial={false}>
									<motion.span
										key={open ? 'close' : 'open'}
										initial={
											reduceMotion
												? false
												: { opacity: 0, rotate: -90, scale: 0.85 }
										}
										animate={{ opacity: 1, rotate: 0, scale: 1 }}
										exit={
											reduceMotion
												? undefined
												: { opacity: 0, rotate: 90, scale: 0.85 }
										}
										transition={{ duration: 0.18 }}
										className="flex"
									>
										{open ? (
											<X className="h-5 w-5" />
										) : (
											<Menu className="h-5 w-5" />
										)}
									</motion.span>
								</AnimatePresence>
							</button>
						</div>
					</div>

					{/* MOBILE / TABLET NAV */}
					<AnimatePresence initial={false}>
						{open && (
							<motion.nav
								id="mobile-nav"
								key="mobile-nav"
								initial={reduceMotion ? false : { height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
								transition={
									reduceMotion
										? { duration: 0 }
										: {
												height: { ...springConfig },
												opacity: { duration: 0.22 },
											}
								}
								className="overflow-hidden border-t border-border/40 lg:hidden"
							>
								<ul className="flex flex-col gap-1 p-2.5 pt-2 sm:p-3">
									{navLinks.map((link, index) => {
										const Icon = link.icon;
										const sectionId = getSectionId(link.href);
										const isExternalLink = isExternal(link.href);
										const isActive =
											!isExternalLink &&
											pathname === '/' &&
											sectionId !== null &&
											sectionId === active;

										return (
											<motion.li
												key={link.href}
												initial={
													reduceMotion ? false : { opacity: 0, y: 10 }
												}
												animate={{ opacity: 1, y: 0 }}
												exit={
													reduceMotion ? undefined : { opacity: 0, y: -4 }
												}
												transition={{
													duration: 0.3,
													delay: reduceMotion ? 0 : 0.03 + index * 0.045,
												}}
											>
												<Link
													href={link.href}
													target={isExternalLink ? '_blank' : undefined}
													rel={
														isExternalLink
															? 'noopener noreferrer'
															: undefined
													}
													onClick={(e) => {
														if (
															!isExternalLink &&
															pathname === '/' &&
															sectionId
														) {
															e.preventDefault();
															goToSection(sectionId);
														} else {
															closeMenu();
														}
													}}
													className={cn(
														'flex min-h-11 items-center gap-3 rounded-xl px-3.5 py-3 font-medium transition-colors duration-200 sm:min-h-12 sm:py-3.5',
														isActive
															? 'bg-primary/10 text-primary ring-1 ring-primary/20'
															: 'text-muted-foreground active:bg-accent/70 hover:bg-accent/70 hover:text-foreground',
													)}
												>
													{Icon && <Icon className="h-5 w-5 shrink-0" />}
													<span>{link.label}</span>
												</Link>
											</motion.li>
										);
									})}
								</ul>
							</motion.nav>
						)}
					</AnimatePresence>

					{!open && <ScrollProgress />}
				</div>
			</div>
		</header>
	);
}
