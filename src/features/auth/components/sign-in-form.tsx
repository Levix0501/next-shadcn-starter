'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { signIn } from '@/actions/auth';
import { SubmitButton } from '@/components/submit-button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
	username: z.string().min(1, 'Username is required'),
	password: z.string().min(1, 'Password is required')
});

type FormValues = z.infer<typeof formSchema>;

export function SignInForm() {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const { update } = useSession();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: ''
		}
	});

	const onSubmit = async (values: FormValues) => {
		setIsPending(true);

		try {
			const res = await signIn(values);

			if (res?.error) {
				toast.error(res.error);
			} else {
				toast.success('Login successful');
				router.refresh();
				update();
			}
		} catch (error) {
			console.error(error);
			toast.error('Login failed, please contact the administrator');
		} finally {
			setIsPending(false);
		}
	};

	return (
		<Form {...form}>
			<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input disabled={isPending} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input disabled={isPending} type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<SubmitButton isPending={isPending}>Sign In</SubmitButton>
			</form>
		</Form>
	);
}
