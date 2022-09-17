import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import moment from 'moment';
import parse from 'html-react-parser';
import { IoCalendar, IoPricetag } from 'react-icons/io5';
import PageLayout from 'common/layout';
import Post from 'domain/model/post';
import ModuleContainer from 'common/shared/module-container';
import PostController from 'controller/post/post-controller';
import Carousel from 'common/ui/Carousel';

type PostListProps = {
    post: Post;
};

const controller = ModuleContainer.resolve(PostController);

const PostList: NextPage<PostListProps> = (props) => {
    const { post } = props;

    return (
        <PageLayout>
            <Head>
                <title>
                    {post.category} | {post.title}
                </title>
            </Head>
            <>
                <div className="post-detail-header-container">
                    <div className="responsive post-detail-header">
                        <div className="detail-post-info">
                            <div className="detail-post-title">{post.title}</div>
                            <div>
                                <IoCalendar size={20} />
                                <span>{moment(post.created_at).format('HH:mm - DD/MM/yyyy')}</span>
                            </div>
                            <div>
                                <IoPricetag size={20} />
                                <span>{post.category}</span>
                            </div>
                        </div>
                        <Carousel
                            className="detail-post-photos"
                            photos={post.photos.map((p) => p.url)}
                        />
                    </div>
                </div>
                <div className="responsive">{parse(post.content)}</div>
            </>
        </PageLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { pid } = context.query;
    if (typeof pid !== 'string' || !pid) {
        return {
            notFound: true,
        };
    }
    const post = await controller.getPost(pid.substring(pid.lastIndexOf('-') + 1));
    if (!post) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            post,
        },
    };
};

export default PostList;
