import type { Metadata } from 'next';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/projects/Projects';
import { Specialization } from '@/components/sections/Specialization';
import { Stack } from '@/components/sections/Stack';
import { withBasePath } from '@/lib/basePath';

export const metadata: Metadata = {
	title: 'THEzombiePL',
	description:
		'Tworzę nowoczesne aplikacje webowe, backendy, API oraz ' +
		'automatyzacje. Next.js, TypeScript, Node.js, DevOps.',

	openGraph: {
		title: 'THEzombiePL – Fullstack Developer',
		description: 'Nowoczesne aplikacje webowe, backend, API, automatyzacje i DevOps.',
		images: [withBasePath('/og/home.png')],
	},

	twitter: {
		title: 'THEzombiePL – Fullstack Developer',
		description: 'Next.js, TypeScript, Node.js, backend, automatyzacje i DevOps.',
		images: [withBasePath('/og/home.png')],
	},
};

export default function Home() {
	return (
		<main>
			<Hero />
			<About />
			<Specialization />
			<Stack />

			<Projects />
			<Contact />
		</main>
	);
}
