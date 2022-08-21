import type { NextPage } from 'next';
import Head from 'next/head';
import PageLayout from '@common/layout';
import TextInput from '@common/ui/TextInput';
import Button from '@common/ui/Button';

const Home: NextPage = () => {
    return (
        <PageLayout>
            <Head>
                <title>Blog of Tung</title>
            </Head>
            <>
                <div className="home-banner-container">
                    <div className="responsive home-banner">
                        <div className="home-banner-title">Welcome to my blog</div>
                        <div className="home-banner-slogan">
                            <span>Think the reason</span> <span>before giving up</span>
                        </div>
                        <div>
                            Here is a place that I share my posts about my life. Read, write and
                            explore with me.
                        </div>
                        <form className="home-subscribe">
                            <TextInput placeholder="Your email..." />
                            <Button>Subscribe</Button>
                        </form>
                    </div>
                </div>
                <div className="responsive">
                    <div className="home-title">Recent posts</div>
                </div>
            </>
        </PageLayout>
    );
};

export default Home;
