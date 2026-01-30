'use client';

import { useEffect, useState } from 'react';

export function HydrationSkeleton({ children }: { children: React.ReactNode }) {
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setHydrated(true);
	}, []);

	if (!hydrated) {
		return <div className="h-85 w-full max-w-95 animate-pulse rounded-xl bg-muted/40" />;
	}

	return <>{children}</>;
}
