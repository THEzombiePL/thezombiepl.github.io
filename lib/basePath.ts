export function getBasePath(): string {
	const raw =
		process.env.NEXT_PUBLIC_REPO_NAME || process.env.GITHUB_REPOSITORY?.split('/')[1] || '';

	if (!raw) return '';

	const cleaned = raw.replace(/^\/+|\/+$/g, '');

	if (cleaned.endsWith('.github.io')) {
		return '';
	}

	return cleaned ? `/${cleaned}` : '';
}

const withBasePath = (path: string) => `${getBasePath()}${path}`;
export { withBasePath };
