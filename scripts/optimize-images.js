import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = './public/images';
const files = fs.readdirSync(dir);

async function processImages() {
	for (const file of files) {
		if (file.endsWith('.png')) {
			const inputPath = path.join(dir, file);
			const outputPath = path.join(dir, file.replace('.png', '.webp'));

			try {
				let pipeline = sharp(inputPath);
				const metadata = await pipeline.metadata();

				// Zmniejsz jeśli szersze niż 1280px by zbić LCP i wagę
				if (metadata.width > 1280) {
					pipeline = pipeline.resize({ width: 1280, withoutEnlargement: true });
				}

				await pipeline.webp({ quality: 90 }).toFile(outputPath);
				console.log(`Converted ${file} to webp`);
				
				// Usuń stary plik png
				fs.unlinkSync(inputPath);
			} catch (e) {
				console.error(`Failed to process ${file}`, e);
			}
		}
	}
}

processImages();
