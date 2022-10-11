import type { NextPage, GetServerSideProps } from 'next';
import toNormalizePath from 'common/helper/to-normalize-path';
import ModuleContainer from 'common/shared/module-container';
import PostController from 'controller/post-controller';
import PageLayout from 'common/layout';
import Head from 'next/head';
import Category from 'domain/model/category';
import Post from 'domain/model/post';
import PostItem from 'common/widget/post-item';
import { useRouter } from 'next/router';
import Pagination from 'common/ui/Pagination';
import useSelector from 'utils/redux/use-selector';
import { setPage } from 'utils/redux/reducer/post-list-reducer';

const postController = ModuleContainer.resolve(PostController);

type PostListProps = {
    category: Category;
    posts?: Array<Post>;
    totalPosts?: number;
};

const PostList: NextPage<PostListProps> = (props) => {
    const { category, posts = [], totalPosts = 0 } = props;
    const router = useRouter();
    const page = useSelector(postController.createSelector((state) => state.postList.page));
    const limit = useSelector(postController.createSelector((state) => state.postList.limit));

    const onClickPostItem = (post: any) => {
        const categoryPath = toNormalizePath(post.category);
        const titlePath = toNormalizePath(post.title);
        router.push(`/post/${categoryPath}/${titlePath}-${post._id}`);
    };

    const onNavPage = (page: number) => {
        postController.dispatch(setPage(page));
    };

    return (
        <PageLayout>
            <Head>
                <title>Post | {category.name}</title>
            </Head>
            <div className="responsive">
                <div className="post-list-title">All posts in {category.name}</div>
                <div className="post-list-all-posts mb-8">
                    {posts.map((post) => (
                        <PostItem
                            key={post._id}
                            imageURL={post.photos[0]}
                            title={post.title}
                            category={post.category}
                            views={post.views}
                            createdAt={post.createdAt}
                            onClick={() => onClickPostItem(post)}
                        />
                    ))}
                </div>
                {posts.length > 0 ? (
                    <div className="flex justify-center mb-4">
                        <Pagination
                            page={page}
                            pageCount={Math.ceil(totalPosts / limit)}
                            onPage={onNavPage}
                        />
                    </div>
                ) : (
                    <div className="post-list-no-data">
                        <img src="/image/no_data.jpg" alt="no-data" />
                        <div className="mb-4">Not found any posts in this category</div>
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { category } = context.query;
    if (typeof category !== 'string' || !category) {
        return {
            notFound: true,
        };
    }
    const categories = await postController.getCategories();
    const _category = categories.find((cate) => toNormalizePath(cate.name) === category);
    if (!_category) {
        return {
            notFound: true,
        };
    }
    const { posts, count } = await postController.getPostsByCategory(0, 12, _category.name);
    return {
        props: {
            category: _category,
            posts,
            totalPosts: count,
        },
    };
};

export default PostList;
