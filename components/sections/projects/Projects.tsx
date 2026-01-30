import { FadeInSection } from '@/components/FadeInSection';
import { getAllProjects } from '@/lib/mdx';
import { ProjectsGrid } from './ProjectsGrid';

export function Projects() {
	const projects = getAllProjects();

	return (
		<FadeInSection delay={0.05}>
			<section id="projects" className="scroll-mt-20 py-24">
				<div className="mx-auto max-w-5xl px-6">
					<h2 className="text-3xl font-bold">Projekty</h2>

					<div className="mt-1 mb-10 h-px w-12 bg-primary/60" />

					<ProjectsGrid projects={projects} />
				</div>
			</section>
		</FadeInSection>
	);
}
