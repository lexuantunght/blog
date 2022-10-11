import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import * as Yup from 'yup';
import AdminPageLayout from 'common/admin-layout';
import Button from 'common/ui/Button';
import Textarea from 'common/ui/Textarea';
import { useFormik } from 'formik';
import ModuleContainer from 'common/shared/module-container';
import UserController from 'controller/user-controller';
import Loader from 'common/ui/Loader';
import Emitter from 'utils/event-manager/emitter';
import AppEventType from 'common/event-type/app-event-type';

const TextEditor = dynamic(() => import('common/ui/TextEditor'), { ssr: false });

const Profile: NextPage = () => {
    const userController = ModuleContainer.resolve(UserController);
    const emitter = ModuleContainer.resolve(Emitter);

    const formik = useFormik({
        initialValues: {
            introduction: '',
            cv: '',
        },
        validationSchema: Yup.object({
            introduction: Yup.string().required(),
            cv: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            const result = await userController.createAboutMe(values.introduction, values.cv);
            emitter.emit(AppEventType.SHOW_TOAST, result);
        },
    });
    return (
        <AdminPageLayout className="ad-page-container">
            <form className="flex-col" onSubmit={formik.handleSubmit}>
                <div className="ad-page-title">Update profile</div>
                <div className="flex-col mt-4">
                    <label htmlFor="introduction" className="mb-1 w-fit">
                        Introduction
                    </label>
                    <div className="ad-profile-intro">
                        <Textarea
                            className="w-full"
                            id="introduction"
                            minRows={3}
                            placeholder="Type introduction..."
                            value={formik.values.introduction}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <label htmlFor="cv" className="mt-4 mb-1 w-fit">
                        Curriculum vitae
                    </label>
                    <TextEditor
                        id="cv"
                        placeholder="Type content..."
                        onChange={(value) => formik.setFieldValue('cv', value)}
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <Button type="reset" mode="outlined" className="mr-2" variant="error">
                        Discard
                    </Button>
                    <Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                        {formik.isSubmitting ? <Loader /> : 'Save profile'}
                    </Button>
                </div>
            </form>
        </AdminPageLayout>
    );
};

export default Profile;
