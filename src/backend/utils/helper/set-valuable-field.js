const setValuableField = (obj, path, value) => {
    if (typeof path === 'string') {
        if (value) {
            obj[path] = value;
        }
        return obj;
    }
    path.forEach((p, i) => {
        if (value[i]) {
            obj[p] = value[i];
        }
    });
    return obj;
};

module.exports = setValuableField;
