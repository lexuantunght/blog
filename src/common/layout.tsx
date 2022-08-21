import React from 'react';
import Head from 'next/head';
import HeaderBar from '@common/widget/header-bar';
import FooterBar from '@common/widget/footer-bar';

type PageLayoutProps = {
    children: React.ReactNode;
};

const menuItems = [
    {
        label: 'Home',
        path: '/',
    },
    {
        label: 'Web Dev',
        path: '/web-dev',
    },
    {
        label: 'Stories',
        path: '/stories',
    },
    {
        label: 'ZA Journey',
        path: '/za-journey',
    },
    {
        label: 'About me',
        path: '/about-me',
    },
];

const PageLayout = ({ children }: PageLayoutProps) => {
    React.useEffect(() => {
        document.body.classList.add('custom-scroll', 'scrolling');
    }, []);

    return (
        <>
            <Head>
                <meta name="description" content="A blog of Le Xuan Tung" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderBar menuItems={menuItems} />
            <main>{children}</main>
            <FooterBar />
        </>
    );
};

export default PageLayout;
