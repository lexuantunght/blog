import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import AdminPageLayout from 'common/admin-layout';
import Button from 'common/ui/Button';

const TextEditor = dynamic(() => import('common/ui/TextEditor'), { ssr: false });

const Profile: NextPage = () => {
    return (
        <AdminPageLayout className="ad-page-container">
            <div className="ad-page-title">Update profile</div>
            <div className="flex-col">
                <label htmlFor="introduction">Introduction</label>
                <textarea id="introduction" />
                <label htmlFor="cv" className="mt-4 mb-1 w-fit">
                    Curriculum vitae
                </label>
                <TextEditor id="cv" placeholder="Type content..." />
            </div>
            <div className="flex justify-end mt-4">
                <Button mode="outlined" variant="error">
                    Discard
                </Button>
                <Button>Save profile</Button>
            </div>
        </AdminPageLayout>
    );
};

export default Profile;
