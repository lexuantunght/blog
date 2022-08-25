type ItemClass = [condition?: boolean, className?: string];

const combineClasses = (...items: Array<ItemClass>) => {
    let result = '';
    items.forEach((item) => {
        if (item[0] && item[1]) {
            result += ` ${item[1]}`;
        }
    });
    return result;
};

export default combineClasses;
