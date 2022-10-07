const objectToQuery = (obj: Record<string, string | number>) => {
    let result = '';
    Object.keys(obj).forEach((key, index, arr) => {
        if (index === 0 || index === arr.length - 1) {
            result += `${key}=${obj[key]}`;
        } else {
            result += `&${key}=${obj[key]}`;
        }
    });
    return result;
};

export default objectToQuery;
