import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/header/Header';
import './globals.css';
import { Footer } from '@/components/footer/Footer';
import { getMetadataBase } from '@/lib/siteUrl';
import { BackgroundGrid } from '@/components/BackgroundGrid';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const viewport: Viewport = {
	themeColor: "#15BA81",
	width: 'device-width',
	initialScale: 1,
}

export const metadata: Metadata = {
	metadataBase: getMetadataBase(),
	title: {
		default: 'THEzombiePL',
		template: '%s · THEzombiePL',
	},

	description:
		'THEzombiePL – programista, twórca aplikacji webowych, backendów oraz botów Discord.',

	openGraph: {
		type: 'website',
		siteName: 'THEzombiePL',
	},

	twitter: {
		card: 'summary_large_image',
	},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="pl" className="dark">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Header />
				<BackgroundGrid />
				<main className="pt-16">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
