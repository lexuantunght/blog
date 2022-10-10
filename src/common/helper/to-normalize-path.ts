const toNormalizePath = (title: string) => {
    return title
        .normalize('NFD')
        .toLowerCase()
        .replace(/[^0-9a-z]/gi, ' ')
        .split(' ')
        .join('-');
};

export default toNormalizePath;
