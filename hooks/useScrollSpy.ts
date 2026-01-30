'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[]) {
	const [active, setActive] = useState<string | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		if (pathname !== '/' || !sectionIds.length) {
			setActive(null);
			return;
		}

		const getOffset = () => (window.innerWidth < 768 ? 56 : 72);

		const onScroll = () => {
			const offset = getOffset();
			const triggerRatio = window.innerWidth < 768 ? 0.2 : 0.15;
			const triggerLine = offset + window.innerHeight * triggerRatio;

			let current: string | null = null;

			for (const id of sectionIds) {
				const el = document.getElementById(id);
				if (!el) continue;

				const rect = el.getBoundingClientRect();
				if (rect.top <= triggerLine && rect.bottom > offset) {
					current = id;
				}
			}

			const nearBottom =
				window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

			if (nearBottom) {
				current = sectionIds[sectionIds.length - 1];
			}

			if (current && current !== active) {
				setActive(current);
				window.history.replaceState(null, '', `#${current}`);
			} else if (!current && window.scrollY < 100) {
				setActive(null);
				window.history.replaceState(null, '', window.location.pathname);
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => window.removeEventListener('scroll', onScroll);
	}, [sectionIds, pathname, active]);

	return active;
}
