import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IoAdd } from 'react-icons/io5';
import { TbEdit, TbTrash } from 'react-icons/tb';
import AdminPageLayout from 'common/admin-layout';
import Button from 'common/ui/Button';
import ModuleContainer from 'common/shared/module-container';
import PostController from 'controller/post-controller';
import moment from 'moment';
import useSWR from 'swr';
import LoadingView from 'common/widget/loading-view';

const postController = ModuleContainer.resolve(PostController);

const FETCH_POSTS_KEY = 'FETCH_POSTS';

const PostDashboard: NextPage = () => {
    const router = useRouter();
    const { data } = useSWR(FETCH_POSTS_KEY, () => postController.getAllPosts(0, 10));

    if (!data) {
        return <LoadingView className="h-screen" />;
    }

    return (
        <AdminPageLayout className="ad-page-container">
            <div className="ad-page-title">Post dashboard</div>
            <div className="flex justify-end my-4">
                <Button onClick={() => router.push(router.pathname + '/create')}>
                    <IoAdd size={20} />
                    <span className="ml-1">Add post</span>
                </Button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Mode</th>
                        <th>Date</th>
                        <th>Views</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {data.posts?.map((post, index) => (
                        <tr key={post._id}>
                            <td>{index + 1}</td>
                            <td>{post.title}</td>
                            <td>{post.category}</td>
                            <td>{post.mode}</td>
                            <td>{moment(post.createdAt).format('DD/MM/yyyy')}</td>
                            <td>{post.views}</td>
                            <td>
                                <div className="flex">
                                    <Button variant="success" mode="text">
                                        <TbEdit size={20} />
                                    </Button>
                                    <Button variant="error" mode="text">
                                        <TbTrash size={20} />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminPageLayout>
    );
};

export default PostDashboard;
