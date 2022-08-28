import 'reflect-metadata';
import '../styles/index.scss';
import '@common/ui/theme.scss';
import '@common/ui/utils.scss';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default App;
