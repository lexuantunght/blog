import React from 'react';
import Head from 'next/head';
import HeaderConfig from 'config/header';
import HeaderBar from 'common/widget/header-bar';
import FooterBar from 'common/widget/footer-bar';
import ToastView from 'common/widget/toast-view';

type PageLayoutProps = {
    children: React.ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
    React.useEffect(() => {
        document.body.classList.add('custom-scroll', 'scrolling');
    }, []);

    return (
        <>
            <Head>
                <meta name="description" content="A blog of Le Xuan Tung" />
                <link rel="icon" href="/favicon.ico" />
                <title>Blog & Diary</title>
            </Head>
            <HeaderBar menuItems={HeaderConfig.menuItems} />
            <main>{children}</main>
            <ToastView />
            <FooterBar />
        </>
    );
};

export default PageLayout;
