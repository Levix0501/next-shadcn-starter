'use client';

import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

export interface SubmitButtonProps extends React.PropsWithChildren {
	isPending?: boolean;
	className?: string;
	disabled?: boolean;
	size?: 'default' | 'sm' | 'lg' | 'icon';
	onClick?: () => void;
}

export function SubmitButton({
	children,
	isPending: propIsPending,
	className,
	disabled,
	size,
	onClick
}: Readonly<SubmitButtonProps>) {
	const { pending } = useFormStatus();
	const isPending = propIsPending || pending;

	return (
		<Button
			aria-disabled={isPending}
			className={cn('w-full cursor-pointer transition-none', className)}
			disabled={disabled || isPending}
			size={size}
			type={onClick ? 'button' : 'submit'}
			onClick={onClick}
		>
			{isPending && <Loader2 className="animate-spin" />}
			{children}
			<span aria-live="polite" className="sr-only">
				{isPending ? 'Loading' : 'Submit form'}
			</span>
		</Button>
	);
}
