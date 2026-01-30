import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./app/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./lib/**/*.{ts,tsx}',
		'./hooks/**/*.{ts,tsx}',
	],
};

export default config;
