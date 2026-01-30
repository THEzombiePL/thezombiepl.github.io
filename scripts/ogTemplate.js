export function ogTemplate({ title, subtitle, brand }) {
	return `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%" stop-color="#0f172a"/>
			<stop offset="100%" stop-color="#020617"/>
		</linearGradient>
	</defs>

	<rect width="1200" height="630" fill="url(#bg)" />

	<text
		x="80"
		y="260"
		font-size="64"
		font-family="Arial, Helvetica, sans-serif"
		fill="#ffffff"
		font-weight="700"
	>
		${escapeXml(title)}
	</text>

	${
		subtitle
			? `
	<text
		x="80"
		y="330"
		font-size="36"
		font-family="Arial, Helvetica, sans-serif"
		fill="#94a3b8"
	>
		${escapeXml(subtitle)}
	</text>`
			: ''
	}

	<text
		x="80"
		y="520"
		font-size="28"
		font-family="Arial, Helvetica, sans-serif"
		fill="#22c55e"
	>
		${escapeXml(brand)}
	</text>
</svg>
`;
}

function escapeXml(str) {
	return str.replace(/[<>&'"]/g, (c) => {
		return (
			{
				'<': '&lt;',
				'>': '&gt;',
				'&': '&amp;',
				'"': '&quot;',
				"'": '&apos;',
			}[c] || c
		);
	});
}
