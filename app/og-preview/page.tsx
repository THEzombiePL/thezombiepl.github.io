import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';

const OG_DIR = path.join(process.cwd(), 'public/og/projects');

export default function OgPreviewPage() {
	const files = fs.readdirSync(OG_DIR).filter((f) => f.endsWith('.png'));

	return (
		<main className="container py-24">
			<h1 className="mb-10 text-3xl font-bold">OG Preview</h1>

			<div className="grid gap-10 md:grid-cols-2">
				{files.map((file) => (
					<div key={file} className="space-y-4">
						<p className="text-sm text-muted-foreground">{file}</p>

						<div className="overflow-hidden rounded-xl border">
							<Image
								src={withBasePath(`/og/projects/${file}`)}
								alt={file}
								width={1200}
								height={630}
								className="w-full h-auto"
								unoptimized
							/>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
