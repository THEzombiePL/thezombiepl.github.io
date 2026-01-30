'use client';

export function scrollToSection(id: string, offset = 72) {
	const el = document.getElementById(id);
	if (!el) return;

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const top = el.getBoundingClientRect().top + window.scrollY - offset;

	window.scrollTo({
		top,
		behavior: prefersReducedMotion ? 'auto' : 'smooth',
	});

	window.history.pushState(null, '', `#${id}`);
}
