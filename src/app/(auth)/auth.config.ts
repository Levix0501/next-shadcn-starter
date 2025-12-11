import { NextAuthConfig } from 'next-auth';

export const authConfig = {
	pages: {
		signIn: '/sign-in'
	},
	providers: [
		// added later in auth.ts since it requires bcrypt which is only compatible with Node.js
		// while this file is also used in non-Node.js environments
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id as string;
			}

			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
			}

			return session;
		},
		authorized({ auth, request: { nextUrl } }) {
			const pathname = nextUrl.pathname;
			const isOnLogin = pathname.startsWith('/sign-in');
			const isLoggedIn = !!auth?.user;
			const callbackUrl = nextUrl.searchParams.get('callbackUrl');

			if (isLoggedIn) {
				if (isOnLogin) {
					return Response.redirect(
						new URL(callbackUrl ?? '/dashboard', nextUrl)
					);
				}

				return true;
			}

			if (!isOnLogin) {
				let callbackUrl = pathname;

				if (nextUrl.search) {
					callbackUrl += nextUrl.search;
				}

				const encodedCallbackUrl = encodeURIComponent(callbackUrl);

				return Response.redirect(
					new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl)
				);
			}

			return true;
		}
	},
	trustHost: true
} satisfies NextAuthConfig;
