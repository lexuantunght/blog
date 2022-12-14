import React from 'react';
import moment from 'moment';
import { IoEye, IoPricetag } from 'react-icons/io5';
import styles from './post-item.module.scss';

type PostItemProps = {
    imageURL?: string;
    title?: string;
    description?: string;
    views: number;
    createdAt: Date;
    category: string;
    onClick?: () => void;
};

const PostItem = (props: PostItemProps) => {
    const { imageURL, title, views, createdAt, category, onClick } = props;
    return (
        <div className={styles.container} onClick={onClick}>
            {imageURL && <img src={imageURL} className={styles.thumb} alt="thumb" />}
            <div className={styles.title}>{title}</div>
            <div className={styles.info}>
                <div>
                    <span>
                        <IoEye />
                        <span className={styles.view}>{views}</span>
                    </span>
                    <span>{moment(createdAt).fromNow(true)}</span>
                </div>
                <div>
                    <span>
                        <IoPricetag />
                        <span className={styles.category}>{category}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
