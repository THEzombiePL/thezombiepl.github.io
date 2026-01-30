import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { type ProjectFrontmatter, projectSchema } from './projectSchema';

export type Project = {
	slug: string;
	content: string;
} & ProjectFrontmatter;

const CONTENT_DIR = path.join(process.cwd(), 'content/projects');

export function getAllProjects(): Project[] {
	const files = fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith('.mdx'));

	const slugs = new Set<string>();

	return files
		.map((file) => {
			const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
			const { data, content } = matter(raw);

			const parsed = projectSchema.safeParse(data);

			if (!parsed.success) {
				throw new Error(`Invalid frontmatter in ${file}:\n${parsed.error.format()}`);
			}

			const fm = parsed.data;

			const slug =
				fm.slug ??
				file
					.replace(/\.mdx$/, '')
					.toLowerCase()
					.replace(/\s+/g, '-');

			if (slugs.has(slug)) {
				throw new Error(`Duplicate project slug detected: "${slug}"`);
			}

			slugs.add(slug);

			const hero =
				fm.hero ??
				(fm.images?.length
					? {
							src: fm.images[0].src,
							caption: fm.images[0].caption,
						}
					: undefined);

			return {
				slug,
				content,
				...fm,
				hero,
			};
		})
		.filter((project) => !project.draft)
		.sort((a, b) => {
			const posA = a.position ?? Number.MAX_SAFE_INTEGER;
			const posB = b.position ?? Number.MAX_SAFE_INTEGER;
			return posA - posB;
		});
}

export function getProjectBySlug(slug: string): Project | undefined {
	return getAllProjects().find((p) => p.slug === slug);
}
