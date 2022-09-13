import React from 'react';
import _times from 'lodash-es/times';
import combineClasses from 'common/ui/combine-classes';
import styles from './paging-indicator.module.scss';

type PagingIndicatorProps = {
    pageCount: number;
    page?: number;
    className?: string;
};

const PagingIndicator = (props: PagingIndicatorProps) => {
    const { pageCount, page = 0, className } = props;

    return (
        <div className={combineClasses([true, styles.container], [true, className])}>
            {_times(pageCount).map((_v, idx) => (
                <div
                    key={idx}
                    className={combineClasses([true, styles.item], [page === idx, styles.showing])}
                />
            ))}
        </div>
    );
};

export default PagingIndicator;
