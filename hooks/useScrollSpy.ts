'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getHeaderOffset, isDocumentScrollLocked } from '@/lib/scrollToSection';

/** DOM section → which nav item should stay highlighted */
export type SectionSpyEntry = {
	id: string;
	navId: string;
};

function syncHash(navId: string | null) {
	if (typeof window === 'undefined') return;
	if (window.location.pathname !== '/') return;

	const path = window.location.pathname;
	const next = navId ? `#${navId}` : '';

	if (navId) {
		if (window.location.hash !== next) {
			window.history.replaceState(null, '', `${path}${next}`);
		}
	} else if (window.location.hash) {
		window.history.replaceState(null, '', path);
	}
}

/**
 * Tracks which nav item is active based on scroll position.
 * Multiple page sections can map to one nav id (e.g. specialization → about).
 */
export function useScrollSpy(sections: SectionSpyEntry[]) {
	const [active, setActive] = useState<string | null>(null);
	const pathname = usePathname();
	const activeRef = useRef<string | null>(null);

	useEffect(() => {
		if (pathname !== '/' || !sections.length) {
			activeRef.current = null;
			setActive(null);
			return;
		}

		const onScroll = () => {
			if (window.location.pathname !== '/') return;

			// Body is position:fixed while the mobile menu is open.
			// scrollY≈0 and a collapsed scrollHeight make nearBottom always true → false #contact.
			if (isDocumentScrollLocked()) return;

			const offset = getHeaderOffset(4);
			const triggerRatio = window.innerWidth < 768 ? 0.22 : 0.18;
			const triggerLine = offset + window.innerHeight * triggerRatio;

			let currentNav: string | null = null;

			for (const { id, navId } of sections) {
				const el = document.getElementById(id);
				if (!el) continue;

				const rect = el.getBoundingClientRect();
				// Last matching section wins (page order)
				if (rect.top <= triggerLine && rect.bottom > offset) {
					currentNav = navId;
				}
			}

			const nearBottom =
				window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;

			if (nearBottom) {
				currentNav = sections[sections.length - 1]?.navId ?? null;
			}

			if (!currentNav && window.scrollY < 80) {
				currentNav = null;
			}

			if (currentNav === activeRef.current) return;

			activeRef.current = currentNav;
			setActive(currentNav);

			// Side effects MUST stay outside setState - Next.js Router listens to
			// history.replaceState and would throw "update Router while rendering Header"
			queueMicrotask(() => syncHash(currentNav));
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		onScroll();

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	}, [pathname, sections]);

	return active;
}
