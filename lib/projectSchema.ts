import { z } from 'zod';

export const projectSchema = z.object({
	title: z.string(),
	slug: z.string().optional(),
	description: z.string(),
	status: z.enum(['w-trakcie', 'ukonczony']),
	draft: z.boolean().optional().default(false),
	featured: z.boolean().optional().default(false),

	position: z.number().int().positive().optional(),

	tech: z.array(z.string()),
	hero: z
		.object({
			src: z.string(),
			caption: z.string().optional(),
			type: z.enum(['image', 'logo']).optional(),
		})
		.optional(),
	images: z
		.array(
			z.object({
				src: z.string(),
				caption: z.string().optional(),
			}),
		)
		.optional(),
	demo: z.url().optional(),
	repo: z.url().optional(),
	docs: z.url().optional(),
	preview: z.url().optional(),

	scope: z.array(z.string()).optional(),

	timeline: z
		.array(
			z.object({
				label: z.string(),
				date: z.string(),
			}),
		)
		.optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectSchema>;
