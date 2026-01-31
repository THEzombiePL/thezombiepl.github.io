export const BackgroundGrid = () => (
	<div className="fixed inset-0 -z-10 overflow-hidden bg-background">
		<div 
			className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" 
			style={{
				maskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.2) 60%, transparent 90%)',
				WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.2) 60%, transparent 90%)'
			}}
		/>
		<div className="absolute inset-0 bg-radial-at-t from-primary/10 via-transparent to-transparent opacity-70" />
	</div>
);