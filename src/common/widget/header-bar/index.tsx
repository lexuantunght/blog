import React from 'react';
import styles from './header-bar.module.scss';
import Button from '@common/ui/Button';
import { FaBars } from 'react-icons/fa';
import Drawer from '@common/ui/Drawer';
import TextInput from '@common/ui/TextInput';

type HeaderProps = {
    menuItems?: Array<{ label: string; path: string }>;
};

const HeaderBar = ({ menuItems = [] }: HeaderProps) => {
    const [showMenu, setShowMenu] = React.useState(false);
    return (
        <div className={`${styles.header} responsive`}>
            <span className={styles.brand}></span>
            <div className={styles.menu}>
                {menuItems.map((item, index) => (
                    <Button key={index} mode="text" className={styles.menubutton}>
                        {item.label}
                    </Button>
                ))}
            </div>
            <form className={styles.searchbox}>
                <TextInput placeholder="Search..." className={styles.searchinput} />
                <Button className={styles.searchbutton}>Search</Button>
            </form>
            <div className={styles.toggle}>
                <Button onClick={() => setShowMenu(true)}>
                    <FaBars />
                </Button>
            </div>
            <Drawer show={showMenu} onClose={() => setShowMenu(false)} />
        </div>
    );
};

export default HeaderBar;
