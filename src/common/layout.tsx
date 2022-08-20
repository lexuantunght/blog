import Head from 'next/head';
import HeaderBar from '@common/widget/header-bar';

type PageLayoutProps = {
    children: React.ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <>
            <Head>
                <meta name="description" content="A blog of Le Xuan Tung" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderBar />
            <main>{children}</main>
            <footer className="app-footer">haha</footer>
        </>
    );
};

export default PageLayout;
