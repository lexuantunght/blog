const toNormalizePath = (title: string) => {
    return title
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .split(' ')
        .join('-');
};

export default toNormalizePath;
