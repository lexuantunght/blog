const objectToQuery = (obj: Record<string, string>) => {
    let result = '';
    Object.keys(obj).forEach((key, index) => {
        if (index === 0) {
            result += `?${key}=${obj[key]}`;
        } else {
            result += `&${key}=${obj[key]}`;
        }
    });
    return result;
};

export default objectToQuery;
