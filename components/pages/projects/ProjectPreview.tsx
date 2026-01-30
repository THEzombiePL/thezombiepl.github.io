'use client';

import { useEffect, useState } from 'react';

export function ProjectPreview({ url, title }: { url: string; title: string }) {
	const [status, setStatus] = useState<'loading' | 'ok' | 'blocked'>('loading');
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setIsMobile(window.innerWidth < 768);

		const timer = setTimeout(() => {
			setStatus((s) => (s === 'loading' ? 'blocked' : s));
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	if (isMobile || status === 'blocked') {
		return (
			<div className="rounded-xl border bg-muted/30 p-6 text-center">
				<p className="mb-4 text-muted-foreground">Podgląd strony nie jest dostępny.</p>
				<a
					href={url}
					target="_blank"
					className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
				>
					Otwórz stronę →
				</a>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			<h3 className="text-xl font-semibold">Live preview</h3>

			<div className="relative aspect-video overflow-hidden rounded-xl border">
				{status === 'loading' && (
					<div className="absolute inset-0 flex items-center justify-center bg-muted/40">
						<span className="text-sm text-muted-foreground">Ładowanie…</span>
					</div>
				)}

				<iframe
					src={url}
					title={title}
					className="h-full w-full"
					onLoad={() => setStatus('ok')}
				/>
			</div>

			<a href={url} target="_blank" className="text-sm text-muted-foreground underline">
				Otwórz w nowej karcie →
			</a>
		</div>
	);
}
