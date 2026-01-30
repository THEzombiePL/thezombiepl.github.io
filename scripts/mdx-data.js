import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content/projects');

export function getAllProjectsForOg() {
	const files = fs.readdirSync(CONTENT_DIR);
	const slugs = new Set();

	return files
		.map((file) => {
			const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');

			const { data } = matter(raw);

			const slug =
				data.slug ??
				file
					.replace(/\.mdx$/, '')
					.toLowerCase()
					.replace(/\s+/g, '-');

			if (slugs.has(slug)) {
				throw new Error(`Duplicate slug: ${slug}`);
			}
			slugs.add(slug);

			if (data.draft) return null;

			return {
				slug,
				title: data.title,
				description: data.description,
			};
		})
		.filter(Boolean);
}
