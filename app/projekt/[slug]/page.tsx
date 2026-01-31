import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import { ProjectBreadcrumbs } from '@/components/pages/projects/ProjectBreadcrumbs';
import { ProjectGallery } from '@/components/pages/projects/ProjectGallery';
import { ProjectLinks } from '@/components/pages/projects/ProjectLinks';
import { ProjectPreview } from '@/components/pages/projects/ProjectPreview';
import { ProjectScope } from '@/components/pages/projects/ProjectScope';
import { ProjectTimeline } from '@/components/pages/projects/ProjectTimeline';
import { Badge } from '@/components/ui/badge';
import { withBasePath } from '@/lib/basePath';
import { getAllProjects, getProjectBySlug } from '@/lib/mdx';

export const dynamic = 'force-static';
export const revalidate = false;

interface Props {
	params: Promise<{ slug: string }>;
}

const rehypeOptions: Options = {
	theme: 'monokai',
	// keepBackground: false,
};

const statusConfig = {
	ukonczony: {
		label: 'Ukończony',
		icon: '✔',
		className: 'bg-primary/15 text-primary ring-1 ring-primary/30',
	},
	'w-trakcie': {
		label: 'W trakcie',
		icon: '⏳',
		className: 'bg-yellow-500/15 text-yellow-400 ring-1 ring-yellow-500/30',
	},
} as const;

/* REQUIRED FOR output: export */
export function generateStaticParams() {
	return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);
	if (!project) return {};

	return {
		title: project.title,
		description: project.description,
		openGraph: {
			title: project.title,
			description: project.description,
			images: [withBasePath(`/og/projects/${slug}.png`)],
		},
		twitter: {
			card: 'summary_large_image',
			images: [withBasePath(`/og/projects/${slug}.png`)],
		},
	};
}

export default async function ProjectPage({ params }: Props) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);
	if (!project) return notFound();

	return (
		<main className="pb-32">
			{/* ===== BREADCRUMBS ===== */}
			<section className="pt-24 pb-8">
				<div className="mx-auto max-w-3xl px-6">
					<ProjectBreadcrumbs title={project.title} />
				</div>
			</section>

			{/* ===== HERO ===== */}
			<section className="pb-20">
				<div className="mx-auto max-w-3xl px-6 space-y-6">
					<div className="flex flex-wrap items-center gap-3">
						<h1 className="text-4xl font-bold">{project.title}</h1>

						{project.status && statusConfig[project.status] && (
							<span
								className={`
						inline-flex items-center gap-1.5
						rounded-full px-2.5 py-1 text-xs font-medium
						whitespace-nowrap
						${statusConfig[project.status].className}
					`}
							>
								<span className="text-sm">{statusConfig[project.status].icon}</span>
								<span>{statusConfig[project.status].label}</span>
							</span>
						)}
					</div>

					<p className="text-lg text-muted-foreground">{project.description}</p>
				</div>
			</section>

			{/* ===== STACK ===== */}
			<section className="pb-16">
				<div className="mx-auto max-w-3xl px-6">
					<div className="flex flex-wrap gap-2">
						{project.tech.map((t) => (
							<Badge key={t} variant="outline">
								{t}
							</Badge>
						))}
					</div>
				</div>
			</section>

			{/* ===== HERO IMAGE ===== */}
			{project.hero && (
				<section className="pb-24">
					<div className="mx-auto max-w-6xl px-6">
						<div className="relative aspect-video overflow-hidden rounded-2xl bg-muted/40">
							<Image
								src={withBasePath(project.hero.src)}
								alt={project.hero.caption ?? project.title}
								fill
								className={
									project.hero.type === 'logo'
										? 'object-contain p-12'
										: 'object-cover'
								}
								priority
							/>
						</div>
					</div>
				</section>
			)}

			{/* ===== SCOPE ===== */}
			{project.scope && (
				<section className="pb-24">
					<div className="mx-auto max-w-3xl px-6">
						<ProjectScope items={project.scope} />
					</div>
				</section>
			)}

			{/* ===== TIMELINE ===== */}
			{project.timeline && (
				<section className="pb-24">
					<div className="mx-auto max-w-3xl px-6">
						<ProjectTimeline items={project.timeline} />
					</div>
				</section>
			)}
			{(project.demo || project.docs || project.repo) && (
				<section className="pb-24">
					<div className="mx-auto max-w-3xl px-6">
						<ProjectLinks demo={project.demo} docs={project.docs} repo={project.repo} />
					</div>
				</section>
			)}

			{/* ===== LIVE PREVIEW ===== */}
			{project.preview && (
				<section className="pb-24">
					<div className="mx-auto max-w-4xl px-6">
						<ProjectPreview
							url={project.preview}
							title={`Live preview: ${project.title}`}
						/>
					</div>
				</section>
			)}

			{/* ===== GALLERY ===== */}
			{project.images && project.images.length > 0 && (
				<section className="pb-24">
					<div className="mx-auto max-w-5xl px-6">
						<ProjectGallery images={project.images} />
					</div>
				</section>
			)}

			{/* ===== DESCRIPTION ===== */}
			<section>
				<div className="mx-auto max-w-3xl px-6">
					<article className="prose prose-invert">
						<MDXRemote
							source={project.content}
							options={{
								mdxOptions: {
									rehypePlugins: [[rehypePrettyCode, rehypeOptions]],
								},
							}}
						/>
					</article>
				</div>
			</section>
		</main>
	);
}
