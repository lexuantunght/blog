import type { NextPage } from 'next';
import Head from 'next/head';
import PageLayout from '@common/layout';
import TextInput from '@common/ui/TextInput';
import Button from '@common/ui/Button';
import PostItem from '@common/widget/post-item';
import Pagination from '@common/ui/Pagination';
import ModuleContainer from '@common/shared/module-container';
import HomeController from '@controller/home/home-controler';

type HomeProps = {
    data: { posts: []; totalPages: number };
};

const controller = ModuleContainer.resolve(HomeController);

const Home: NextPage<HomeProps> = (props) => {
    const { posts = [], totalPages } = props.data;
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
                        {posts.map((post: any) => (
                            <PostItem
                                _id={post._id}
                                key={post._id}
                                imageURL={post.photos[0].url}
                                title={post.title}
                                category={post.category}
                                views={post.views}
                                created_at={post.created_at}
                            />
                        ))}
                    </div>
                    <div className="home-recent-posts-pagination">
                        <Pagination pageCount={totalPages} page={0} />
                    </div>
                </div>
            </>
        </PageLayout>
    );
};

export async function getServerSideProps() {
    return controller.getServerSideProps('/post/getAll/8/0');
}

export default Home;
