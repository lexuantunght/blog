import type { NextPage } from 'next';
import Head from 'next/head';
import PageLayout from '@common/layout';

const Home: NextPage = () => {
    return (
        <PageLayout>
            <Head>
                <title>Blog of Tung</title>
            </Head>

            <main className="home-main"></main>
        </PageLayout>
    );
};

export default Home;
