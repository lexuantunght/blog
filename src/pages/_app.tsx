import 'reflect-metadata';
import 'styles/index.scss';
import 'common/ui/theme.scss';
import 'common/ui/utils.scss';
import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import LoadingView from 'common/widget/loading-view';

function App({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleStart = (url: string) => {
        url !== router.pathname && !router.pathname.startsWith('/admin')
            ? setLoading(true)
            : setLoading(false);
    };
    const handleComplete = () => setLoading(false);

    React.useEffect(() => {
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, []);

    if (loading) {
        return <LoadingView className="app-loading-view" />;
    }

    return <Component {...pageProps} />;
}

export default App;
