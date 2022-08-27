import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import moment from 'moment';
import parse from 'html-react-parser';
import { IoCalendar, IoPricetag } from 'react-icons/io5';
import PageLayout from '@common/layout';
import Post from '@domain/model/post';
import ModuleContainer from '@common/shared/module-container';
import PostController from '@controller/post/post-controller';
import Carousel from '@common/ui/Carousel';

type WebDevPostDetailProps = {
    post: Post;
};

const controller = ModuleContainer.resolve(PostController);

const WebDevPostDetail: NextPage<WebDevPostDetailProps> = ({ post }) => {
    return (
        <PageLayout>
            <Head>
                <title>Web Dev | {post.title}</title>
            </Head>
            <>
                <div className="web-dev-post-header-container">
                    <div className="responsive web-dev-post-header">
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
    const { slug } = context.query;
    if (!slug || !slug[0]) {
        return {
            notFound: true,
        };
    }
    const postId = slug[0];
    const post = await controller.getPost(postId);
    return {
        props: {
            post,
        },
    };
};

export default WebDevPostDetail;
