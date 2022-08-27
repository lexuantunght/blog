import combineClasses from '@common/ui/combine-classes';
import styles from './divider.module.scss';

type DividerProps = {
    className?: string;
};

const Divider = (props: DividerProps) => {
    const { className } = props;
    return <div className={combineClasses([true, styles.line], [true, className])} />;
};

export default Divider;
