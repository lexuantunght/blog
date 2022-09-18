import React from 'react';
import Link from 'next/link';
import styles from './header-bar.module.scss';
import Button from 'common/ui/Button';
import { FaBars } from 'react-icons/fa';
import { IoChevronDown } from 'react-icons/io5';
import Drawer from 'common/ui/Drawer';
import TextInput from 'common/ui/TextInput';
import combineClasses from 'common/ui/combine-classes';
import Collapse from 'common/ui/Collapse';

export type MenuItem = {
    label: string;
    path: string;
    items?: Array<MenuItem>;
};

export type HeaderProps = {
    menuItems?: Array<MenuItem>;
};

const HeaderBar = ({ menuItems = [] }: HeaderProps) => {
    const [showMenu, setShowMenu] = React.useState(false);
    return (
        <div className={styles.container}>
            <div className={`${styles.header} responsive`}>
                <Link href="/">
                    <a className={combineClasses([true, styles.brand], [true, styles.link])}>
                        Blog of Tung
                    </a>
                </Link>
                <div className={styles.menu}>
                    {menuItems.map((item, index) => {
                        if (!item.items) {
                            return (
                                <Link key={index} href={item.path}>
                                    <a className={styles.link}>{item.label}</a>
                                </Link>
                            );
                        }
                        return (
                            <div key={index} className={styles.wrapper}>
                                <div className="flex items-center">
                                    {item.label}
                                    {item.items && <IoChevronDown className="ml-1" />}
                                </div>
                                <div
                                    className={combineClasses(
                                        [true, styles.sub],
                                        [true, 'absolute']
                                    )}>
                                    {item.items.map((subItem, key) => (
                                        <Link href={subItem.path} key={key}>
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
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
                <Drawer
                    show={showMenu}
                    onClose={() => setShowMenu(false)}
                    bodyClassName={styles.drawer}>
                    <div className={styles.intro}>BLOG & DIARY</div>
                    <form className="flex my-2">
                        <TextInput placeholder="Search..." className="w-full" />
                        <Button className={styles.searchbutton}>Search</Button>
                    </form>
                    {menuItems.map((item, index) => {
                        if (!item.items) {
                            return (
                                <Link href={item.path} key={index}>
                                    {item.label}
                                </Link>
                            );
                        }
                        return (
                            <Collapse title={item.label} key={index} className="my-1">
                                {item.items.map((subItem, key) => (
                                    <Link href={subItem.path} key={key}>
                                        {subItem.label}
                                    </Link>
                                ))}
                            </Collapse>
                        );
                    })}
                </Drawer>
            </div>
        </div>
    );
};

export default HeaderBar;
