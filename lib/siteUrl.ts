import { getBasePath } from './basePath';

export function getSiteUrl(): string {
	const explicit = process.env.NEXT_PUBLIC_SITE_URL;
	if (explicit) {
		const url = explicit.startsWith('http') ? explicit : `https://${explicit}`;

		return url.replace(/\/+$/, '');
	}

	const repoEnv = process.env.GITHUB_REPOSITORY;
	if (repoEnv) {
		const [owner, repo] = repoEnv.split('/');

		if (repo?.endsWith('.github.io')) {
			return `https://${repo}`;
		}

		if (owner) {
			return `https://${owner}.github.io`;
		}
	}

	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}

	return 'http://localhost:3000';
}

export function getMetadataBase(): URL {
	const siteUrl = getSiteUrl();
	const basePath = getBasePath();

	return new URL(`${siteUrl}${basePath}`);
}
