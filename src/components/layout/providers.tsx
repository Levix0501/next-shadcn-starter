import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import { QueryProvider } from './query-provider';

export const Providers = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<SessionProvider>
			<QueryProvider>
				<ThemeProvider
					disableTransitionOnChange
					enableColorScheme
					enableSystem
					attribute="class"
					defaultTheme="system"
				>
					{children}
				</ThemeProvider>
			</QueryProvider>
		</SessionProvider>
	);
};
