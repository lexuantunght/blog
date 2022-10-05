import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PageLayout from 'common/layout';
import TextInput from 'common/ui/TextInput';
import Button from 'common/ui/Button';
import PostItem from 'common/widget/post-item';
import Pagination from 'common/ui/Pagination';
import ModuleContainer from 'common/shared/module-container';
import HomeController from 'controller/home/home-controller';
import toNormalizePath from 'common/helper/to-normalize-path';
import Loader from 'common/ui/Loader';
import Post from 'domain/model/post';
import Emitter from 'utils/event-manager/emitter';
import AppEventType from 'common/event-type/app-event-type';

type HomeProps = {
    data: { posts: Array<Post>; pageCount: number };
    bannerUrl?: string;
};

const controller = ModuleContainer.resolve(HomeController);
const emitter = ModuleContainer.resolve(Emitter);

const Home: NextPage<HomeProps> = (props) => {
    const router = useRouter();
    const { posts = [], pageCount } = props.data;

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
        }),
        onSubmit: async (values) => {
            await controller.subscribeBlog(values.email).then((msg) => {
                emitter.emit(AppEventType.SHOW_TOAST, msg);
            });
        },
    });

    const onClickPostItem = (post: any) => {
        const categoryPath = toNormalizePath(post.category);
        const titlePath = toNormalizePath(post.title);
        router.push(`/post/${categoryPath}/${titlePath}-${post._id}`);
    };

    return (
        <PageLayout>
            <Head>
                <title>Blog of Tung</title>
            </Head>
            <>
                <div className="home-banner-container" style={{ backgroundImage: props.bannerUrl }}>
                    <div className="responsive home-banner">
                        <div className="home-banner-title">Welcome to my blog</div>
                        <div className="home-banner-slogan">
                            <span>Think the reason</span> <span>before giving up</span>
                        </div>
                        <div>
                            Here is a place that I share my posts about my life. Read, write and
                            explore with me.
                        </div>
                        <form className="home-subscribe" onSubmit={formik.handleSubmit}>
                            <TextInput
                                placeholder="Your email..."
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <Button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
                                {formik.isSubmitting && <Loader />}
                                <span className="ml-1">Subscribe</span>
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="responsive">
                    <div className="home-title">Recent posts</div>
                    <div className="home-recent-posts">
                        {posts.map((post: Post) => (
                            <PostItem
                                key={post._id}
                                imageURL={post.photos[0].url}
                                title={post.title}
                                category={post.category}
                                views={post.views}
                                created_at={post.created_at}
                                onClick={() => onClickPostItem(post)}
                            />
                        ))}
                    </div>
                    <div className="home-recent-posts-pagination">
                        <Pagination pageCount={pageCount} page={0} />
                    </div>
                    <div className="home-title">Most views</div>
                    <div className="home-recent-posts">
                        {posts.map((post: Post) => (
                            <PostItem
                                key={post._id}
                                imageURL={post.photos[0].url}
                                title={post.title}
                                category={post.category}
                                views={post.views}
                                created_at={post.created_at}
                                onClick={() => onClickPostItem(post)}
                            />
                        ))}
                    </div>
                    <div className="home-recent-posts-pagination">
                        <Pagination pageCount={pageCount} page={0} />
                    </div>
                </div>
            </>
        </PageLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await controller.getRecentPosts();
    return {
        props: {
            data,
        },
    };
};

export default Home;
