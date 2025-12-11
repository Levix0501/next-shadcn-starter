import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { InteractiveGridPattern } from '@/features/auth/components/interactive-grid';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import { cn } from '@/lib/utils';

export default function Page() {
	return (
		<main className="relative h-screen flex-col items-center justify-center overflow-hidden md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
				<div className="absolute inset-0 bg-zinc-900" />
				<div className="relative z-20 flex items-center text-lg font-medium">
					<svg
						className="mr-2 h-6 w-6"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
					</svg>
					Logo
				</div>
				<InteractiveGridPattern
					className={cn(
						'mask-[radial-gradient(400px_circle_at_center,white,transparent)]',
						'inset-x-0 inset-y-[0%] h-full skew-y-12'
					)}
				/>
			</div>
			<div className="flex h-full items-center justify-center p-4 lg:p-8">
				<div className="flex w-full max-w-md flex-col items-center justify-center space-y-6">
					<Card className="w-sm shadow-none">
						<CardHeader>
							<CardTitle>Login</CardTitle>
							<CardDescription>
								Enter your username and password
							</CardDescription>
						</CardHeader>
						<CardContent>
							<SignInForm />
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
