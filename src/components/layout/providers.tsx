import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

export const Providers = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<SessionProvider>
			<ThemeProvider
				disableTransitionOnChange
				enableColorScheme
				enableSystem
				attribute="class"
				defaultTheme="system"
			>
				{children}
			</ThemeProvider>
		</SessionProvider>
	);
};
