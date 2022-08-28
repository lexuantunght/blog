import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { FaUserEdit, FaUserLock, FaSignOutAlt } from 'react-icons/fa';
import SideBarConfig from '@config/side-bar';
import SideBar from '@common/widget/side-bar';
import LoadingView from '@common/widget/loading-view';
import Modal from '@common/ui/Modal';
import Button from '@common/ui/Button';
import ModuleContainer from '@common/shared/module-container';
import AuthController from '@controller/authentication/auth-controller';
import UserData from '@domain/model/user-data';

type AdminPageLayoutProps = {
    children: React.ReactNode;
};

const controller = ModuleContainer.resolve(AuthController);

const AdminPageLayout = ({ children }: AdminPageLayoutProps) => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const [userData, setUserData] = React.useState<UserData | null>(null);
    const [showLogout, setShowLogout] = React.useState(false);

    const coreItems = [
        {
            label: 'Update profile',
            icon: <FaUserEdit size={20} />,
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
            await controller.logout();
            router.replace('/admin/login');
        },
    });

    React.useEffect(() => {
        document.body.classList.add('custom-scroll', 'scrolling');
        controller
            .authorize()
            .then((data) => {
                if (data) {
                    setUserData(data);
                }
            })
            .then(() => setLoading(false));
    }, []);

    if (!userData) {
        if (!loading) {
            router.push('/admin/login');
            return null;
        }
        return <LoadingView className="main-loading-view" />;
    }

    return (
        <>
            <Head>
                <meta name="description" content="A blog of Le Xuan Tung" />
                <link rel="icon" href="/favicon.ico" />
                <title>Blog of Tung | Admin</title>
            </Head>
            <main>
                <SideBar
                    avatar={userData.avatar?.url}
                    name={userData.name}
                    menuItems={SideBarConfig.menuItems}
                    coreItems={coreItems}
                />
                <div>{children}</div>
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
