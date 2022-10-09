import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoCheckmark } from 'react-icons/io5';
import AdminPageLayout from 'common/admin-layout';
import TextInput from 'common/ui/TextInput';
import Dropdown from 'common/ui/Dropdown';
import ImageUploader from 'common/ui/ImageUploader';
import Button from 'common/ui/Button';
import Loader from 'common/ui/Loader';
import ModuleContainer from 'common/shared/module-container';
import PostController from 'controller/post-controller';
import AppConfig from 'config/app';
import Category from 'domain/model/category';
import { ImageFile } from 'common/model';

const TextEditor = dynamic(() => import('common/ui/TextEditor'), { ssr: false });

type CreatePostProps = {
    categories: Array<Category>;
};

const postController = ModuleContainer.resolve(PostController);

const CreatePost: NextPage<CreatePostProps> = (props) => {
    const { categories } = props;
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            title: '',
            category: categories[0].name || '',
            mode: AppConfig.modes[0],
            photos: [],
            content: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required(),
            content: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            const post = new FormData();
            post.append('title', values.title);
            post.append('content', values.content);
            post.append('mode', values.mode);
            post.append('category', values.category);
            values.photos.forEach((photo: ImageFile) => {
                post.append('image', photo.file, photo.name);
            });
            await postController.createPost(post);
            router.push('/admin/post');
        },
    });

    const handleCancel = () => {
        router.push('/admin/post');
    };

    return (
        <AdminPageLayout className="ad-page-container custom-scroll scrolling">
            <div className="ad-page-title">Post dashboard &gt; Create</div>
            <form className="flex-col mt-4" onSubmit={formik.handleSubmit}>
                <label htmlFor="title" className="mb-1 w-fit">
                    Title
                </label>
                <TextInput
                    id="title"
                    placeholder="Post title"
                    className="h-9"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    invalid={!!(formik.touched.title && formik.errors.title)}
                    errorText={formik.errors.title}
                />
                <label htmlFor="category" className="mt-4 mb-1 w-fit">
                    Category
                </label>
                <Dropdown
                    id="category"
                    options={categories.map((cate) => ({ value: cate.name, label: cate.name }))}
                    className="h-9 w-fit"
                    value={formik.values.category}
                    onChange={(value) => formik.setFieldValue('category', value)}
                />
                <label htmlFor="mode" className="mt-4 mb-1 w-fit">
                    Mode
                </label>
                <Dropdown
                    id="mode"
                    options={AppConfig.modes.map((mode) => ({ value: mode, label: mode }))}
                    className="h-9 w-fit"
                    value={formik.values.mode}
                    onChange={(value) => formik.setFieldValue('mode', value)}
                />
                <label htmlFor="photos" className="mt-4 mb-1 w-fit">
                    Attach photos
                </label>
                <ImageUploader
                    id="photos"
                    onChange={(images) => formik.setFieldValue('photos', images)}
                />
                <label htmlFor="content" className="mt-4 mb-1 w-fit">
                    Content
                </label>
                <TextEditor
                    id="content"
                    placeholder="Type content..."
                    onChange={(value) => formik.setFieldValue('content', value)}
                />
                <div className="flex justify-end mt-4">
                    <Button type="button" variant="error" mode="outlined" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="ml-2"
                        disabled={formik.isSubmitting || !formik.isValid}>
                        {formik.isSubmitting ? <Loader /> : <IoCheckmark size={20} />}
                        <span className="ml-1">Save post</span>
                    </Button>
                </div>
            </form>
        </AdminPageLayout>
    );
};

export const getServerSideProps = async () => {
    const data = await postController.getCategories();
    return {
        props: {
            categories: data,
        },
    };
};

export default CreatePost;
