import type { NextConfig } from 'next';
const getBasePath = (): string => {
	const raw = process.env.NEXT_PUBLIC_REPO_NAME || process.env.GITHUB_REPOSITORY?.split('/')[1] || '';
	if (!raw) return '';
	const cleaned = raw.replace(/^\/+|\/+$/g, '');
	if (cleaned.endsWith('.github.io')) return '';
	return cleaned ? `/${cleaned}` : '';
};

const basePath = getBasePath();

const nextConfig: NextConfig = {
	output: 'export',
	basePath,
	assetPrefix: basePath,
	trailingSlash: true,
	images: {
		unoptimized: true,
	},

	transpilePackages: ['next-mdx-remote'],
};
export default nextConfig;
