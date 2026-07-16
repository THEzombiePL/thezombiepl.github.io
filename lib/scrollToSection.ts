'use client';

let lockedScrollY = 0;
let scrollLocked = false;
let restoreRaf1 = 0;
let restoreRaf2 = 0;

function isMobileViewport() {
	return window.innerWidth < 768;
}

/** True while the mobile menu (or any caller) has pinned the document. */
export function isDocumentScrollLocked() {
	return scrollLocked;
}

function readScrollY() {
	return (
		window.scrollY ||
		window.pageYOffset ||
		document.documentElement.scrollTop ||
		document.body.scrollTop ||
		0
	);
}

function writeScrollY(y: number) {
	const top = Math.max(0, Math.round(y));
	const prevBehavior = document.documentElement.style.scrollBehavior;
	document.documentElement.style.scrollBehavior = 'auto';
	document.documentElement.scrollTop = top;
	document.body.scrollTop = top;
	window.scrollTo({ top, left: 0, behavior: 'instant' });
	document.documentElement.style.scrollBehavior = prevBehavior;
}

function cancelPendingRestore() {
	if (restoreRaf1) cancelAnimationFrame(restoreRaf1);
	if (restoreRaf2) cancelAnimationFrame(restoreRaf2);
	restoreRaf1 = 0;
	restoreRaf2 = 0;
}

function scheduleRestore(y: number) {
	cancelPendingRestore();
	restoreRaf1 = requestAnimationFrame(() => {
		writeScrollY(y);
		restoreRaf2 = requestAnimationFrame(() => {
			if (Math.abs(readScrollY() - y) > 1) {
				writeScrollY(y);
			}
			restoreRaf1 = 0;
			restoreRaf2 = 0;
		});
	});
}

/**
 * Space occupied by the fixed nav chrome (top of viewport → bottom of bar).
 */
export function getHeaderOffset(extra?: number): number {
	if (typeof document === 'undefined') return 64;

	const mobile = isMobileViewport();
	const gap = extra ?? (mobile ? 6 : 10);

	const bar = document.querySelector<HTMLElement>('[data-site-header-bar]');
	if (bar) {
		return Math.round(bar.getBoundingClientRect().bottom) + gap;
	}

	return mobile ? 60 : 80;
}

function preventTouchScroll(e: TouchEvent) {
	const target = e.target as HTMLElement | null;
	if (target?.closest('[data-scroll-allow]')) return;
	e.preventDefault();
}

function clearLockStyles() {
	const { body, documentElement } = document;
	body.style.position = '';
	body.style.top = '';
	body.style.left = '';
	body.style.right = '';
	body.style.width = '';
	body.style.overflow = '';
	documentElement.style.overflow = '';
	delete body.dataset.scrollLocked;
	delete body.dataset.scrollLockedY;
}

/**
 * iOS-safe body lock. Pins the body with position:fixed and remembers scrollY.
 */
export function lockDocumentScroll() {
	if (typeof document === 'undefined' || scrollLocked) return;

	lockedScrollY = readScrollY();
	scrollLocked = true;

	const { body, documentElement } = document;
	body.style.position = 'fixed';
	body.style.top = `-${lockedScrollY}px`;
	body.style.left = '0';
	body.style.right = '0';
	body.style.width = '100%';
	body.style.overflow = 'hidden';
	documentElement.style.overflow = 'hidden';
	body.dataset.scrollLocked = 'true';
	body.dataset.scrollLockedY = String(lockedScrollY);

	document.addEventListener('touchmove', preventTouchScroll, { passive: false });
}

export type UnlockOptions = {
	/**
	 * When true (default), restore the scroll position from before the lock.
	 * Pass false when the next action will scroll elsewhere (nav link) so we
	 * don't fight that scroll with a restore-to-old-Y rAF loop.
	 */
	restore?: boolean;
};

/**
 * Unlock body scroll. By default restores the pre-lock position (menu close).
 * Use `{ restore: false }` before programmatic navigation scroll.
 */
export function unlockDocumentScroll(options?: UnlockOptions): number {
	if (typeof document === 'undefined') return 0;

	const shouldRestore = options?.restore !== false;
	const { body } = document;
	const wasLocked = scrollLocked || body.style.position === 'fixed';

	if (!wasLocked) {
		return readScrollY();
	}

	const fromDataset = Number.parseInt(body.dataset.scrollLockedY || '', 10);
	const fromTop = Math.abs(Number.parseInt(body.style.top || '0', 10));
	const y = scrollLocked
		? lockedScrollY
		: Number.isFinite(fromDataset)
			? fromDataset
			: fromTop || readScrollY();

	cancelPendingRestore();
	clearLockStyles();
	scrollLocked = false;
	document.removeEventListener('touchmove', preventTouchScroll);

	if (shouldRestore) {
		writeScrollY(y);
		scheduleRestore(y);
	}

	return y;
}

function prefersReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Smooth-scroll to a section, landing just under the fixed header.
 * If the mobile menu had locked scroll, unlocks without restoring the old Y
 * so you get a single scroll to the target (no jump-back + re-scroll).
 */
export function scrollToSection(id: string, offset?: number) {
	const el = document.getElementById(id);
	if (!el) return;

	const wasLocked = scrollLocked || document.body.style.position === 'fixed';
	// Keep visual position in a local so we can land smoothly from where the user was
	const fromY = wasLocked ? lockedScrollY : readScrollY();

	// Unlock WITHOUT restoring - restore would fight this navigation scroll
	unlockDocumentScroll({ restore: false });

	// After removing position:fixed, scrollY is 0 unless we set it.
	// Pin to the pre-lock Y so layout/measurements match what the user saw.
	if (wasLocked) {
		writeScrollY(fromY);
	}

	const reduce = prefersReducedMotion();

	const run = () => {
		const headerOffset = offset ?? getHeaderOffset();
		const absoluteTop = el.getBoundingClientRect().top + readScrollY();
		const top = Math.max(0, Math.round(absoluteTop - headerOffset));

		window.scrollTo({
			top,
			left: 0,
			behavior: reduce ? 'auto' : 'smooth',
		});

		window.setTimeout(
			() => {
				if (window.location.pathname !== '/') return;
				const next = `#${id}`;
				if (window.location.hash !== next) {
					window.history.replaceState(null, '', `${window.location.pathname}${next}`);
				}
			},
			reduce ? 0 : 400,
		);
	};

	// One frame for layout after unfixed body, then a single scroll
	requestAnimationFrame(() => {
		requestAnimationFrame(run);
	});
}
