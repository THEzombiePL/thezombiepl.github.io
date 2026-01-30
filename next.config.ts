import type { NextConfig } from 'next';
import { getBasePath } from './lib/basePath';

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
