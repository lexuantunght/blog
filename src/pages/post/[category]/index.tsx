import type { NextPage, GetServerSideProps } from 'next';
import toNormalizePath from 'common/helper/to-normalize-path';
import ModuleContainer from 'common/shared/module-container';
import PostController from 'controller/post/post-controller';

const controller = ModuleContainer.resolve(PostController);

const PostList: NextPage = () => {
    return <></>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { category } = context.query;
    if (typeof category !== 'string' || !category) {
        return {
            notFound: true,
        };
    }
    const categories = await controller.getCategories();
    const _category = categories.find((cate) => toNormalizePath(cate.name) === category);
    if (!_category) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            category: _category,
        },
    };
};

export default PostList;
