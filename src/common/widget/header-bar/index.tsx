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
        <div className={styles.container}>
            <div className={`${styles.header} responsive`}>
                <a href="/" className={styles.brand}>
                    Blog of Tung
                </a>
                <div className={styles.menu}>
                    {menuItems.map((item, index) => (
                        <a key={index} href={item.path}>
                            {item.label}
                        </a>
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
        </div>
    );
};

export default HeaderBar;
