export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
			<h1 className="text-6xl font-bold text-primary">404</h1>
			<p className="mt-4 text-lg text-muted-foreground">Ta strona nie istnieje.</p>

			<a href="/" className="mt-8 rounded-lg bg-primary px-6 py-3 text-primary-foreground">
				Wróć na stronę główną
			</a>
		</div>
	);
}
