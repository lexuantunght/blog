import React from 'react';
import moment from 'moment';
import { Tag } from '@common/model';
import { IoEye, IoPricetag } from 'react-icons/io5';
import styles from './post-item.module.scss';

type PostItemProps = {
    imageURL?: string;
    title?: string;
    description?: string;
    view: number;
    created_at: Date;
    tag: Tag;
};

const PostItem = (props: PostItemProps) => {
    const { imageURL, title, view, created_at, tag } = props;
    return (
        <div className={styles.container}>
            {imageURL && <img src={imageURL} className={styles.thumb} alt="thumb" />}
            <div className={styles.title}>{title}</div>
            <div className={styles.info}>
                <div>
                    <span>
                        <IoEye />
                        <span className={styles.view}>{view}</span>
                    </span>
                    <span>{moment(created_at).fromNow(true)}</span>
                </div>
                <div>
                    <span>
                        <IoPricetag />
                        <span className={styles.tag}>{tag}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
