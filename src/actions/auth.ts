'use server';

import { AuthError } from 'next-auth';

import { signIn as authSignIn } from '@/app/(auth)/auth';

export async function signIn(values: { username: string; password: string }) {
	try {
		await authSignIn('credentials', {
			username: values.username,
			password: values.password,
			redirect: false
		});

		return { success: true };
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Username or password is incorrect' };
				default:
					return { error: 'Login failed, please contact the administrator' };
			}
		}

		throw error;
	}
}
