import type { NextPage, GetServerSideProps } from 'next';
import toNormalizePath from 'common/helper/to-normalize-path';
import ModuleContainer from 'common/shared/module-container';
import PostController from 'controller/post/post-controller';

const controller = ModuleContainer.resolve(PostController);

const PostList: NextPage = () => {
    return <></>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.query;
    if (!slug || !slug[0]) {
        return {
            notFound: true,
        };
    }
    const categories = await controller.getCategories();
    const category = categories.find((cate) => toNormalizePath(cate.name) === slug[0]);
    if (!category) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            category,
        },
    };
};

export default PostList;
