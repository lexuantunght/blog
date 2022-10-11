import React from 'react';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import { useFormik } from 'formik';
import { FaUserEdit, FaUserLock, FaSignOutAlt } from 'react-icons/fa';
import SideBarConfig from 'config/side-bar';
import SideBar from 'common/widget/side-bar';
import LoadingView from 'common/widget/loading-view';
import Modal from 'common/ui/Modal';
import Button from 'common/ui/Button';
import ModuleContainer from 'common/shared/module-container';
import AuthController from 'controller/auth-controller';
import useSelector from 'utils/redux/use-selector';

type AdminPageWrapperProps = {
    children: React.ReactNode;
    router: NextRouter;
    className?: string;
};

type AdminPageLayoutProps = {
    children: React.ReactNode;
    className?: string;
};

const authController = ModuleContainer.resolve(AuthController);

const AdminPageWrapper = ({ children, router, className }: AdminPageWrapperProps) => {
    const [loading, setLoading] = React.useState(true);
    const userData = useSelector(authController.createSelector((state) => state.app.userData));

    React.useEffect(() => {
        authController
            .authorize()
            .then((data) => {
                if (data) {
                    authController.setUserData(data);
                }
            })
            .then(() => setLoading(false));
    }, []);

    if (!userData) {
        if (!loading) {
            router.push('/admin/login');
            return null;
        }
        return <LoadingView className="h-screen" />;
    }

    return <div className={className}>{children}</div>;
};

const AdminPageLayout = ({ children, className }: AdminPageLayoutProps) => {
    const router = useRouter();
    const userData = useSelector(authController.createSelector((state) => state.app.userData));
    const [showLogout, setShowLogout] = React.useState(false);

    const coreItems = [
        {
            label: 'Update profile',
            icon: <FaUserEdit size={20} />,
            path: '/admin/profile',
        },
        {
            label: 'Change password',
            icon: <FaUserLock size={20} />,
        },
        {
            label: 'Log out',
            icon: <FaSignOutAlt size={20} />,
            onClick: () => setShowLogout(true),
        },
    ];

    const logoutForm = useFormik({
        initialValues: {},
        onSubmit: async () => {
            await authController.logout();
            router.replace('/admin/login');
        },
    });

    React.useEffect(() => {
        document.body.classList.add('custom-scroll', 'scrolling');
    }, []);

    return (
        <>
            <Head>
                <meta name="description" content="A blog of Le Xuan Tung" />
                <link rel="icon" href="/favicon.ico" />
                <title>Blog of Tung | Admin</title>
            </Head>
            <main className="flex">
                {userData && (
                    <SideBar
                        avatar={userData.avatar}
                        name={userData.name}
                        menuItems={SideBarConfig.menuItems}
                        coreItems={coreItems}
                    />
                )}
                <AdminPageWrapper router={router} className={className}>
                    {children}
                </AdminPageWrapper>
                <Modal show={showLogout} title="Confirmation" onClose={() => setShowLogout(false)}>
                    <form
                        className="flex-col h-24 justify-between"
                        onSubmit={logoutForm.handleSubmit}>
                        <div>Are you sure to logout?</div>
                        <div className="flex justify-end">
                            <Button
                                type="button"
                                mode="outlined"
                                onClick={() => setShowLogout(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="ml-2"
                                variant="error"
                                disabled={logoutForm.isSubmitting}>
                                Accept
                            </Button>
                        </div>
                    </form>
                </Modal>
            </main>
        </>
    );
};

export default AdminPageLayout;
