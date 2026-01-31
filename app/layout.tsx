import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/header/Header';
import './globals.css';
import { BackgroundGrid } from '@/components/BackgroundGrid';
import { Footer } from '@/components/footer/Footer';
import { getMetadataBase } from '@/lib/siteUrl';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: dark)', color: '#009869' },
		{ media: '(prefers-color-scheme: light)', color: '#00468C' },
	],
	width: 'device-width',
	initialScale: 1,
};

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
	verification: {
		google: 'Q_E3q-5jpffy2K-pqxdYB8U3K9uQ6YgDxaFXPxu1G34',
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
