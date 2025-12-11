import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { authConfig } from './auth.config';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			credentials: {
				username: {},
				password: {}
			},
			async authorize(credentials) {
				const username = credentials?.username as string;
				const password = credentials?.password as string;

				// TODO: Replace with authentication logic
				if (username === 'demo' && password === 'demo') {
					return {
						id: '1',
						name: 'Demo User',
						email: 'demo@example.com'
					};
				}

				return null;
			}
		})
	]
});
