import styles from './loader.module.scss';

type LoaderProps = {
    type?: 'ring' | 'ellipsis';
};

const Loader = (props: LoaderProps) => {
    const { type = 'ring' } = props;
    switch (type) {
        case 'ellipsis':
            return (
                <div className={styles.ellipsis}>
                    <div />
                    <div />
                    <div />
                </div>
            );
        case 'ring':
            return (
                <div className={styles.ring}>
                    <div />
                    <div />
                    <div />
                </div>
            );
        default:
            return null;
    }
};

export default Loader;
