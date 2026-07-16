import { FadeIn, RevealStagger } from '@/components/animations/Reveal';
import { getAllProjects } from '@/lib/mdx';
import { ProjectsGrid } from './ProjectsGrid';

export function Projects() {
	const projects = getAllProjects();

	return (
		<RevealStagger>
			<section id="projects" className="scroll-mt-16 py-16 md:scroll-mt-20 md:py-24">
				<div className="mx-auto max-w-5xl px-6">
					<FadeIn>
						<h2 className="text-3xl font-bold tracking-tight">Projekty</h2>
						<div className="mt-1 mb-10 h-px w-12 bg-primary/60" />
					</FadeIn>

					<ProjectsGrid projects={projects} />
				</div>
			</section>
		</RevealStagger>
	);
}
