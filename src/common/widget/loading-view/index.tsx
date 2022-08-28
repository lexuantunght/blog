import Head from 'next/head';
import Loader from '@common/ui/Loader';
import styles from './loading-view.module.scss';
import combineClasses from '@common/ui/combine-classes';

type LoadingViewProps = {
    className?: string;
};

const LoadingView = (props: LoadingViewProps) => {
    const { className } = props;
    return (
        <>
            <Head>
                <meta name="description" content="A blog of Le Xuan Tung" />
                <link rel="icon" href="/favicon.ico" />
                <title>Loading</title>
            </Head>
            <main className={combineClasses([true, styles.container], [true, className])}>
                <Loader type="ellipsis" />
            </main>
        </>
    );
};

export default LoadingView;
