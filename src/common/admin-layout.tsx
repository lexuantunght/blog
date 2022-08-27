import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SideBarConfig from '@config/side-bar';
import SideBar from '@common/widget/side-bar';
import LoadingView from '@common/widget/loading-view';
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
                    coreItems={SideBarConfig.coreItems}
                />
                <div>{children}</div>
            </main>
        </>
    );
};

export default AdminPageLayout;
