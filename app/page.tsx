
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/projects/Projects';
import { Specialization } from '@/components/sections/Specialization';
import { Stack } from '@/components/sections/Stack';

export default function Home() {
	return (
		<>
			<main>
				<Hero />
				<About />
				<Specialization />
				<Stack />

				<Projects />
				<Contact />
			</main>
		</>
	);
}
