import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

import { getAllProjectsForOg } from './mdx-data.js';
import { ogTemplate } from './ogTemplate.js';

const OG_DIR = path.join(process.cwd(), 'public/og');
const PROJECTS_DIR = path.join(OG_DIR, 'projects');

const SITE_BRAND = process.env.SITE_BRAND ?? process.env.SITE_NAME ?? 'thezombiepl.github.io';

async function ensureDirs() {
	if (!fs.existsSync(OG_DIR)) {
		fs.mkdirSync(OG_DIR, { recursive: true });
	}

	if (!fs.existsSync(PROJECTS_DIR)) {
		fs.mkdirSync(PROJECTS_DIR, { recursive: true });
	}
}

async function generateHomeOg() {
	const svg = ogTemplate({
		title: 'THEzombiePL',
		subtitle: 'Fullstack Developer · Next.js · TypeScript · Node.js',
		brand: SITE_BRAND,
	});

	const outputPath = path.join(OG_DIR, 'home.png');

	await sharp(Buffer.from(svg)).resize(1200, 630).png().toFile(outputPath);

	console.log('✅ OG generated: home');
}

async function generateProjectsOg() {
	const projects = getAllProjectsForOg();

	for (const project of projects) {
		const svg = ogTemplate({
			title: project.title,
			subtitle: project.description,
			brand: SITE_BRAND,
		});

		const outputPath = path.join(PROJECTS_DIR, `${project.slug}.png`);

		await sharp(Buffer.from(svg)).resize(1200, 630).png().toFile(outputPath);

		console.log(`✅ OG generated: projects/${project.slug}`);
	}
}

async function generate() {
	await ensureDirs();
	await generateHomeOg();
	await generateProjectsOg();
}

generate().catch((err) => {
	console.error(err);
	process.exit(1);
});
