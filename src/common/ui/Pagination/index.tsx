import React from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import Button from 'common/ui/Button';
import combineClasses from 'common/ui/combine-classes';
import styles from './pagination.module.scss';

type PaginationProps = {
    pageCount: number;
    page?: number;
    onPage?: (page: number) => void;
};

const DotItem = () => <div className={styles.dots}>...</div>;

const Pagination = (props: PaginationProps) => {
    const { page = 0, pageCount, onPage } = props;

    const listItem = React.useMemo(() => {
        const NumberItem = ({ content }: { content: number }) => (
            <Button
                mode={content - 1 === page ? 'fill' : 'outlined'}
                className={combineClasses([true, styles.button], [true, styles.mid])}
                onClick={() => onPage?.(content - 1)}>
                {content}
            </Button>
        );
        const temp = [];
        if (pageCount < 8) {
            for (let i = 0; i < pageCount; i++) {
                temp.push(<NumberItem content={i + 1} />);
            }
        } else if (page < 4) {
            for (let i = 0; i < 5; i++) {
                temp.push(<NumberItem content={i + 1} />);
            }
            temp.push(<DotItem />);
            temp.push(<NumberItem content={pageCount} />);
        } else if (page >= 4 && page < pageCount - 4) {
            temp.push(<NumberItem content={1} />);
            temp.push(<DotItem />);
            temp.push(<NumberItem content={page} />);
            temp.push(<NumberItem content={page + 1} />);
            temp.push(<NumberItem content={page + 2} />);
            temp.push(<DotItem />);
            temp.push(<NumberItem content={pageCount} />);
        } else {
            temp.push(<NumberItem content={1} />);
            temp.push(<DotItem />);
            for (let i = pageCount - 5; i < pageCount; i++) {
                temp.push(<NumberItem content={i + 1} />);
            }
        }
        return temp.map((item, idx) => ({ ...item, key: idx }));
    }, [page, pageCount, onPage]);

    return (
        <div className={styles.container}>
            <Button
                mode="outlined"
                className={combineClasses([true, styles.button], [true, styles.back])}
                disabled={page === 0}>
                <IoChevronBackOutline />
            </Button>
            {listItem}
            <Button
                mode="outlined"
                className={combineClasses([true, styles.button], [true, styles.next])}
                disabled={page === pageCount - 1}>
                <IoChevronForwardOutline />
            </Button>
        </div>
    );
};

export default Pagination;
