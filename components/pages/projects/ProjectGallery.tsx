'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { withBasePath } from '@/lib/basePath';

interface GalleryItem {
	src: string;
	caption?: string;
}

interface ProjectGalleryProps {
	images: GalleryItem[];
}

const MIN_SCALE = 1;
const MAX_SCALE = 6;
const DOUBLE_TAP_DELAY = 300;
const SWIPE_THRESHOLD = 50;

export function ProjectGallery({ images }: ProjectGalleryProps) {
	const [active, setActive] = useState<number | null>(null);
	const [scale, setScale] = useState(1);
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [isPortrait, setIsPortrait] = useState(false);
	const [touchStartX, setTouchStartX] = useState<number | null>(null);
	const [touchStartY, setTouchStartY] = useState<number | null>(null);

	const containerRef = useRef<HTMLDivElement>(null);

	const lastTapRef = useRef(0);
	const isPinchingRef = useRef(false);
	const isDraggingRef = useRef(false);
	const doubleTapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const tapped = useRef(false);
	const isSwiping = useRef(false);

	const isOpen = active !== null;

	/* =========================
     RESET
  ========================= */
	const reset = useCallback(() => {
		setScale(1);
		setOffset({ x: 0, y: 0 });
	}, []);

	useEffect(() => {
		if (active !== null) reset();
	}, [active, reset]);

	/* =========================
     BODY + ESC + BACK
  ========================= */
	useEffect(() => {
		if (!isOpen) return;

		document.body.style.overflow = 'hidden';

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setActive(null);
			} else if (e.key === 'ArrowLeft' && active !== null) {
				setActive(active > 0 ? active - 1 : images.length - 1);
			} else if (e.key === 'ArrowRight' && active !== null) {
				setActive(active < images.length - 1 ? active + 1 : 0);
			}
		};

		window.addEventListener('keydown', onKey);

		window.history.pushState({ modal: true }, '');
		const onPop = () => setActive(null);
		window.addEventListener('popstate', onPop);

		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('popstate', onPop);

			if (doubleTapTimeoutRef.current) {
				clearTimeout(doubleTapTimeoutRef.current);
				doubleTapTimeoutRef.current = null;
			}
		};
	}, [isOpen, active, images.length]);

	/* =========================
     CLAMP
  ========================= */
	const clampOffset = useCallback(
		(x: number, y: number, s = scale) => {
			const el = containerRef.current;
			if (!el) return { x, y };

			const { width, height } = el.getBoundingClientRect();
			const maxX = ((s - 1) * width) / 2;
			const maxY = ((s - 1) * height) / 2;

			return {
				x: Math.max(-maxX, Math.min(maxX, x)),
				y: Math.max(-maxY, Math.min(maxY, y)),
			};
		},
		[scale],
	);

	/* =========================
     DOUBLE TAP / CLICK
  ========================= */
	const handleTap = useCallback(() => {
		if (scale === 1) {
			setScale(2.5);
			setOffset({ x: 0, y: 0 });
		} else {
			reset();
		}
	}, [scale, reset]);

	/* =========================
     DESKTOP: PAN + ZOOM
  ========================= */
	const panStart = useRef<{ x: number; y: number } | null>(null);

	const onMouseDown = (e: React.MouseEvent) => {
		if (scale === 1) return;
		e.preventDefault();
		isDraggingRef.current = true;
		panStart.current = { x: e.clientX, y: e.clientY };
	};

	useEffect(() => {
		if (!isOpen) return;

		const onGlobalMouseMove = (e: MouseEvent) => {
			if (!isDraggingRef.current || !panStart.current) return;

			const dx = e.clientX - panStart.current.x;
			const dy = e.clientY - panStart.current.y;

			panStart.current = { x: e.clientX, y: e.clientY };
			setOffset((o) => clampOffset(o.x + dx, o.y + dy));
		};

		const onGlobalMouseUp = () => {
			isDraggingRef.current = false;
			panStart.current = null;
		};

		window.addEventListener('mousemove', onGlobalMouseMove);
		window.addEventListener('mouseup', onGlobalMouseUp);

		return () => {
			window.removeEventListener('mousemove', onGlobalMouseMove);
			window.removeEventListener('mouseup', onGlobalMouseUp);
		};
	}, [isOpen, clampOffset]);

	const onWheel = (e: React.WheelEvent) => {
		e.preventDefault();
		const delta = -e.deltaY * 0.001;
		const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta));
		setScale(nextScale);
		setOffset((o) => clampOffset(o.x, o.y, nextScale));
	};

	/* =========================
     MOBILE: PINCH + PAN (2 palce) + DOUBLE TAP + SWIPE
  ========================= */
	const pinchRef = useRef<{
		distance: number;
		scale: number;
		lastX: number;
		lastY: number;
	} | null>(null);

	const dist = (a: React.Touch | Touch, b: React.Touch | Touch) =>
		Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

	const onTouchStart = (e: React.TouchEvent) => {
		e.stopPropagation();

		if (doubleTapTimeoutRef.current) {
			clearTimeout(doubleTapTimeoutRef.current);
			doubleTapTimeoutRef.current = null;
		}

		if (e.touches.length === 1 && scale === 1 && !isSwiping.current) {
			const now = Date.now();
			const timeSinceLastTap = now - lastTapRef.current;

			if (timeSinceLastTap < DOUBLE_TAP_DELAY && timeSinceLastTap > 0) {
				lastTapRef.current = 0;
				tapped.current = true;
				handleTap();
				e.preventDefault();
				return;
			}

			lastTapRef.current = now;

			doubleTapTimeoutRef.current = setTimeout(() => {
				lastTapRef.current = 0;
			}, DOUBLE_TAP_DELAY);
		}

		if (e.touches.length === 1 && scale === 1) {
			setTouchStartX(e.touches[0].clientX);
			setTouchStartY(e.touches[0].clientY);
		}

		if (e.touches.length === 2) {
			const a = e.touches[0];
			const b = e.touches[1];
			isPinchingRef.current = true;
			pinchRef.current = {
				distance: dist(a, b),
				scale,
				lastX: (a.clientX + b.clientX) / 2,
				lastY: (a.clientY + b.clientY) / 2,
			};
		}
	};

	const onTouchMove = (e: React.TouchEvent) => {
		if (e.touches.length === 1 && scale === 1 && touchStartX !== null && touchStartY !== null) {
			const currentX = e.touches[0].clientX;
			const currentY = e.touches[0].clientY;
			const deltaX = currentX - touchStartX;
			const deltaY = currentY - touchStartY;

			if (Math.abs(deltaX) > Math.abs(deltaY)) {
				e.preventDefault();
				isSwiping.current = true;
			}
		}

		if (!isPinchingRef.current || !pinchRef.current || e.touches.length !== 2) return;

		e.preventDefault();

		const a = e.touches[0];
		const b = e.touches[1];

		const d = dist(a, b);
		const ratio = d / pinchRef.current.distance;
		const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, pinchRef.current.scale * ratio));

		const cx = (a.clientX + b.clientX) / 2;
		const cy = (a.clientY + b.clientY) / 2;

		const dx = cx - pinchRef.current.lastX;
		const dy = cy - pinchRef.current.lastY;

		pinchRef.current.distance = d;
		pinchRef.current.scale = nextScale;
		pinchRef.current.lastX = cx;
		pinchRef.current.lastY = cy;

		setScale(nextScale);
		setOffset((o) => clampOffset(o.x + dx, o.y + dy, nextScale));
	};

	const onTouchEnd = (e: React.TouchEvent) => {
		if (tapped.current) {
			e.preventDefault();
			tapped.current = false;
		}

		if (scale === 1 && touchStartX !== null && active !== null) {
			const touchEndX = e.changedTouches[0]?.clientX || 0;
			const deltaX = touchEndX - touchStartX;

			if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
				if (deltaX > 0) {
					setActive((prev) =>
						prev !== null ? (prev > 0 ? prev - 1 : images.length - 1) : null,
					);
				} else {
					setActive((prev) =>
						prev !== null ? (prev < images.length - 1 ? prev + 1 : 0) : null,
					);
				}
			}
		}

		setTouchStartX(null);
		setTouchStartY(null);
		isPinchingRef.current = false;
		pinchRef.current = null;
		isSwiping.current = false;
	};

	/* =========================
    RENDER
  	========================= */
	return (
		<section className="space-y-8">
			<h2 className="text-xl font-semibold">Galeria realizacji</h2>

			{/* GRID */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{images.map((img, i) => (
					<button
						key={withBasePath(img.src)}
						type="button"
						onClick={() => setActive(i)}
						className="group relative block w-full cursor-pointer overflow-hidden rounded-xl border-0 bg-transparent p-0"
					>
						<div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
							{/* biome-ignore lint/performance/noImgElement: Standard img is better for arbitrary aspect ratio handling without explicit width/height */}
							<img
								// src={img.src}
								src={withBasePath(img.src)}
								alt={img.caption ?? ''}
								className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</div>
						{img.caption && (
							<div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
								<p className="text-sm text-white">{img.caption}</p>
							</div>
						)}
					</button>
				))}
			</div>

			{/* LIGHTBOX */}
			{isOpen && active !== null && (
				<div className="fixed inset-0 z-50">
					{/* BACKDROP */}
					<button
						type="button"
						className="absolute inset-0 z-0 bg-black/90"
						onClick={() => setActive(null)}
						aria-label="Zamknij galerię"
					/>

					{/* IMAGE CONTAINER */}
					<div
						ref={containerRef}
						className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-center px-4 touch-none"
					>
						{/* DESKTOP NAVIGATION ARROWS */}
						<button
							type="button"
							onClick={() => setActive(active > 0 ? active - 1 : images.length - 1)}
							className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white transition-colors hover:bg-black/90 hidden md:block"
							aria-label="Poprzedni obrazek"
						>
							←
						</button>

						<button
							type="button"
							onClick={() => setActive(active < images.length - 1 ? active + 1 : 0)}
							className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white transition-colors hover:bg-black/90 hidden md:block"
							aria-label="Następny obrazek"
						>
							→
						</button>

						{/* IMAGE */}
						<section
							tabIndex={-1}
							aria-label="Obraz do przybliżenia i przesuwania"
							className={`relative w-full outline-none ${
								scale === 1
									? 'cursor-zoom-in'
									: isDraggingRef.current
										? 'cursor-grabbing'
										: 'cursor-grab'
							}`}
							onWheel={onWheel}
							onMouseDown={onMouseDown}
							onTouchStart={onTouchStart}
							onTouchMove={onTouchMove}
							onTouchEnd={onTouchEnd}
							onDoubleClick={handleTap}
						>
							<div
								className={`relative w-full overflow-hidden rounded-xl bg-black ${
									isPortrait ? 'aspect-9/16 max-h-[90vh]' : 'aspect-16/10'
								}`}
							>
								{/* biome-ignore lint/performance/noImgElement: Direct manipulation of style/transform is required here */}
								<img
									// src={images[active].src}
									src={withBasePath(images[active].src)}
									alt=""
									className="h-full w-full object-contain"
									onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
										const img = e.currentTarget as HTMLImageElement;
										const ratio = img.naturalHeight / img.naturalWidth;
										setIsPortrait(
											ratio > 1.2 || (ratio >= 0.9 && ratio <= 1.1),
										);
									}}
									style={{
										transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
									}}
								/>
							</div>
						</section>
					</div>

					{/* UI */}
					<button
						type="button"
						onClick={() => {
							reset();
							setActive(null);
						}}
						className="absolute right-4 top-4 z-20 rounded-full bg-black/70 p-3 text-white transition-colors hover:bg-black/90"
					>
						✕
					</button>

					{/* Image counter */}
					<div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-sm text-white">
						{active + 1} / {images.length}
					</div>

					{scale > 1 && (
						<button
							type="button"
							onClick={reset}
							className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-sm text-white transition-colors hover:bg-black/90"
						>
							Reset zoom
						</button>
					)}

					<div className="absolute bottom-6 right-4 z-20 text-sm text-white/60">
						{Math.round(scale * 100)}%
					</div>

					{/* Mobile navigation dots */}
					<div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 space-x-2 md:hidden">
						{images.map((img, index) => (
							<button
								key={img.src}
								type="button"
								onClick={() => setActive(index)}
								className={`h-2 w-2 rounded-full transition-all ${
									index === active ? 'bg-white scale-125' : 'bg-white/40'
								}`}
								aria-label={`Przejdź do obrazek ${index + 1}`}
							/>
						))}
					</div>
				</div>
			)}
		</section>
	);
}
