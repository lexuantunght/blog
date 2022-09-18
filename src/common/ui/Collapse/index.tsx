import React from 'react';
import { IoChevronDown } from 'react-icons/io5';
import combineClasses from 'common/ui/combine-classes';
import styles from './collapse.module.scss';

type CollapseProps = {
    defaultShow?: boolean;
    title: string;
    children: React.ReactNode;
    className?: string;
};

type CollapseStates = {
    expand?: boolean;
    listHeight: number;
    ready: boolean;
};

class Collapse extends React.Component<CollapseProps, CollapseStates> {
    private listRef;
    constructor(props: CollapseProps) {
        super(props);
        this.listRef = React.createRef<HTMLDivElement>();
        this.state = {
            expand: this.props.defaultShow,
            listHeight: 0,
            ready: false,
        };
    }

    componentDidMount() {
        if (this.listRef.current) {
            this.setState({ listHeight: this.listRef.current.offsetHeight, ready: true });
        }
    }

    render() {
        const { title, children, className } = this.props;
        return (
            <div className={combineClasses([true, styles.container], [true, className])}>
                <div
                    className={styles.toggle}
                    onClick={() => this.setState({ expand: !this.state.expand })}>
                    {title}
                    <IoChevronDown
                        className={combineClasses(
                            [true, styles.indicator],
                            [this.state.expand, styles.expand]
                        )}
                    />
                </div>
                <div
                    ref={this.listRef}
                    style={{
                        height: this.state.ready
                            ? this.state.expand
                                ? this.state.listHeight
                                : 0
                            : undefined,
                    }}
                    className={styles.list}>
                    {children}
                </div>
            </div>
        );
    }
}

export default Collapse;
