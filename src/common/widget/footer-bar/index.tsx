import React from 'react';
import styles from './footer-bar.module.scss';

const FooterBar = () => {
    return (
        <div className={styles.container}>
            <div className={`${styles.footer} responsive`}>
                <div className={`${styles.category} ${styles.intro}`}>
                    <div className={`${styles.title} ${styles.name}`}>Blog & Diary</div>
                    <div>Copyright © {new Date().getFullYear()} Le Xuan Tung.</div>
                    <div>All rights reserved.</div>
                </div>
                <div className={styles.category}>
                    <div className={styles.title}>Technical</div>
                    <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                        ReactJS
                    </a>
                    <a href="https://nextjs.org" target="_blank" rel="noreferrer">
                        NextJS
                    </a>
                    <a href="https://mongodb.com" target="_blank" rel="noreferrer">
                        MongoDB
                    </a>
                </div>
                <div className={styles.category}>
                    <div className={styles.title}>Visit me</div>
                    <a href="https://facebook.com/tunglexuan23" target="_blank" rel="noreferrer">
                        Facebook
                    </a>
                    <a href="https://www.linkedin.com/in/tlx-it" target="_blank" rel="noreferrer">
                        Linkedin
                    </a>
                    <a href="https://instagram.com/xuantung_24" target="_blank" rel="noreferrer">
                        Instagram
                    </a>
                </div>
                <div className={styles.category}>
                    <div className={styles.title}>Contact me</div>
                    <div className={styles.email}>lexuantunght@gmail.com</div>
                </div>
            </div>
        </div>
    );
};

export default FooterBar;
