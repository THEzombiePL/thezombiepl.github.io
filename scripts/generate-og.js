import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

import { getAllProjectsForOg } from './mdx-data.js';
import { ogTemplate } from './ogTemplate.js';

const OUT_DIR = path.join(process.cwd(), 'public/og/projects');

const SITE_BRAND = process.env.SITE_BRAND ?? process.env.SITE_NAME ?? 'thezombiepl.github.io';

async function generate() {
	if (!fs.existsSync(OUT_DIR)) {
		fs.mkdirSync(OUT_DIR, { recursive: true });
	}

	const projects = getAllProjectsForOg();

	for (const project of projects) {
		const svg = ogTemplate({
			title: project.title,
			subtitle: project.description,
			brand: SITE_BRAND,
		});

		const outputPath = path.join(OUT_DIR, `${project.slug}.png`);

		await sharp(Buffer.from(svg)).resize(1200, 630).png().toFile(outputPath);

		console.log(`✅ OG generated: ${project.slug}`);
	}
}

generate().catch((err) => {
	console.error(err);
	process.exit(1);
});
