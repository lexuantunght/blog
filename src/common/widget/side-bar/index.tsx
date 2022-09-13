import React from 'react';
import { useRouter } from 'next/router';
import { FaBars } from 'react-icons/fa';
import Divider from 'common/ui/Divider';
import Drawer from 'common/ui/Drawer';
import styles from './side-bar.module.scss';
import Button from 'common/ui/Button';

type SideBarProps = {
    avatar?: string;
    name?: string;
    menuItems?: Array<{
        label: string;
        path: string;
        icon?: React.ReactNode;
    }>;
    coreItems?: Array<{
        label: string;
        path?: string;
        icon?: React.ReactNode;
        onClick?: () => void;
    }>;
};

const SideBarContent = (props: SideBarProps) => {
    const router = useRouter();
    const { avatar, name, menuItems = [], coreItems = [] } = props;
    return (
        <div className={styles.container}>
            {avatar && <img className={styles.avatar} src={avatar} alt="avatar" />}
            <div className={styles.name}>{name}</div>
            <Divider />
            {menuItems.map((item, idx) => (
                <Button
                    key={idx}
                    mode="text"
                    className={styles.item}
                    onClick={() => router.push(item.path)}>
                    {item.icon}
                    <span>{item.label}</span>
                </Button>
            ))}
            <Divider />
            {coreItems.map((item, idx) => (
                <Button
                    key={idx}
                    mode="text"
                    className={styles.item}
                    onClick={() => {
                        if (item.path) {
                            router.push(item.path);
                        } else {
                            item.onClick?.();
                        }
                    }}>
                    {item.icon}
                    <span>{item.label}</span>
                </Button>
            ))}
        </div>
    );
};

const SideBar = (props: SideBarProps) => {
    const [showMenuDrawer, setShowMenuDrawer] = React.useState(false);
    const closeMenuDrawer = () => {
        setShowMenuDrawer(false);
    };
    React.useEffect(() => {
        window.addEventListener('resize', closeMenuDrawer);
        return () => {
            window.removeEventListener('resize', closeMenuDrawer);
        };
    }, []);
    return (
        <>
            <div className={styles.wrapper}>
                <SideBarContent {...props} />
            </div>
            <div className={styles.toggle}>
                <Button mode="outlined" onClick={() => setShowMenuDrawer(true)}>
                    <FaBars />
                </Button>
            </div>
            <Drawer
                show={showMenuDrawer}
                onClose={() => setShowMenuDrawer(false)}
                className={styles.drawer}>
                <SideBarContent {...props} />
            </Drawer>
        </>
    );
};

export default SideBar;
