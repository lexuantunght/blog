import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IoAdd } from 'react-icons/io5';
import { TbEdit, TbTrash } from 'react-icons/tb';
import AdminPageLayout from '@common/admin-layout';
import Button from '@common/ui/Button';
import ModuleContainer from '@common/shared/module-container';
import PostController from '@controller/post/post-controller';
import Post from '@domain/model/post';
import moment from 'moment';

const controller = ModuleContainer.resolve(PostController);

type PostDashboardProps = {
    data: {
        posts: Post[];
        pageCount: number;
    };
};

const PostDashboard: NextPage<PostDashboardProps> = (props) => {
    const router = useRouter();
    const { data } = props;

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
                            <td>{moment(post.created_at).format('DD/MM/yyyy')}</td>
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

export const getServerSideProps = async () => {
    const data = await controller.getAllPosts(0, 10);
    return {
        props: {
            data,
        },
    };
};

export default PostDashboard;
