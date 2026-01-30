import { BookOpen, ExternalLink, Github } from 'lucide-react';

interface Props {
	repo?: string;
	docs?: string;
	demo?: string;
}

export function ProjectLinks({ repo, docs, demo }: Props) {
	if (!repo && !docs && !demo) return null;

	return (
		<div className="rounded-xl border bg-muted/30 p-6">
			<h3 className="mb-4 text-lg font-semibold">Linki projektu</h3>

			<div className="flex flex-wrap gap-3">
				{demo && (
					<a
						href={demo}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
					>
						Demo
						<ExternalLink className="h-4 w-4" />
					</a>
				)}

				{docs && (
					<a
						href={docs}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-accent"
					>
						Dokumentacja
						<BookOpen className="h-4 w-4" />
					</a>
				)}

				{repo && (
					<a
						href={repo}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-accent"
					>
						Repozytorium
						<Github className="h-4 w-4" />
					</a>
				)}
			</div>
		</div>
	);
}
