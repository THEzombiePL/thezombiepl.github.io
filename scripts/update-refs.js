import fs from 'node:fs';
import path from 'node:path';

function replaceInFile(filePath) {
	const content = fs.readFileSync(filePath, 'utf-8');
	if (content.includes('.png')) {
		const newContent = content.replace(/\/images\/([a-zA-Z0-9_-]+)\.png/g, '/images/$1.webp');
		if (content !== newContent) {
			fs.writeFileSync(filePath, newContent, 'utf-8');
			console.log(`Updated ${filePath}`);
		}
	}
}

function processDir(dir) {
	const files = fs.readdirSync(dir);
	for (const file of files) {
		const fullPath = path.join(dir, file);
		if (fs.statSync(fullPath).isDirectory()) {
			processDir(fullPath);
		} else if (fullPath.endsWith('.mdx') || fullPath.endsWith('.tsx')) {
			replaceInFile(fullPath);
		}
	}
}

processDir('./content');
processDir('./components');
