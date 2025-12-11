import { GoogleAnalytics as GoogleAnalyticsComponent } from '@next/third-parties/google';

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const GoogleAnalytics = async () => {
	return (
		process.env.NODE_ENV === 'production' &&
		gaId && <GoogleAnalyticsComponent gaId={gaId} />
	);
};
