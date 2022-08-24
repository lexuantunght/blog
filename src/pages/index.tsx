import type { NextPage } from 'next';
import Head from 'next/head';
import PageLayout from '@common/layout';
import TextInput from '@common/ui/TextInput';
import Button from '@common/ui/Button';
import PostItem from '@common/widget/post-item';

type HomeProps = {
    posts: [];
};

const Home: NextPage<HomeProps> = (props) => {
    const { posts = [] } = props;
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
                    <div className="home-recent-posts">
                        {posts.map((post: any, idx) => (
                            <PostItem
                                key={idx}
                                imageURL={post.imageURL}
                                title={post.title}
                                tag="Life"
                                view={0}
                                created_at={new Date()}
                            />
                        ))}
                    </div>
                </div>
            </>
        </PageLayout>
    );
};

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3001/api/post');
    const posts = await res.json();
    return {
        props: {
            posts,
        },
    };
}

export default Home;
