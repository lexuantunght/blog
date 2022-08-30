import type { NextPage } from 'next';
import { IoCheckmark, IoClose } from 'react-icons/io5';
import AdminPageLayout from '@common/admin-layout';
import TextInput from '@common/ui/TextInput';
import Dropdown from '@common/ui/Dropdown';
import ImageUploader from '@common/ui/ImageUploader';
import TextEditor from '@common/ui/TextEditor';
import Button from '@common/ui/Button';
import Loader from '@common/ui/Loader';

const CreatePost: NextPage = () => {
    return (
        <AdminPageLayout className="ad-page-container">
            <div className="ad-page-title">Post dashboard &gt; Create</div>
            <form className="flex-col mt-4">
                <label htmlFor="title" className="mb-1">
                    Title
                </label>
                <TextInput id="title" placeholder="Post title" className="h-9" />
                <label htmlFor="category" className="mt-4 mb-1">
                    Category
                </label>
                <Dropdown id="category" options={[]} className="h-9" />
                <label htmlFor="mode" className="mt-4 mb-1">
                    Mode
                </label>
                <Dropdown id="mode" options={[]} className="h-9" />
                <label htmlFor="photos" className="mt-4 mb-1">
                    Attach photos
                </label>
                <ImageUploader id="photos" />
                <label htmlFor="content" className="mt-4 mb-1">
                    Content
                </label>
                <TextEditor id="content" />
                <div className="flex justify-end mt-4">
                    <Button type="button" variant="error" mode="outlined">
                        Cancel
                    </Button>
                    <Button type="submit" className="ml-2">
                        {false ? <Loader /> : <IoCheckmark size={20} />}
                        <span className="ml-1">Save post</span>
                    </Button>
                </div>
            </form>
        </AdminPageLayout>
    );
};

export default CreatePost;
