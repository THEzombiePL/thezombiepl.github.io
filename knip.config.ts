import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	entry: ['app/**/page.tsx', 'app/**/layout.tsx', 'app/**/route.ts', 'app/**/not-found.tsx'],

	project: ['**/*.ts', '**/*.tsx'],

	ignore: ['.next/**', 'node_modules/**'],

	ignoreDependencies: ['tw-animate-css', 'shadcn'],
};

export default config;
