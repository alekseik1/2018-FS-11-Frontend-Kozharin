const KB = 1024;
const MB = 1024*1024;
const GB = 1024*1024*1024;

const getReadableSize = (size) => {
    // 10 раздрядов в двоичной СС -- как раз 1024
    if (size >> 10 === 0) {
        return `${size} B`;
    } else if (size >> 10*2 === 0) {
        return `${size >> 10} Kb`;
    } else if (size >> 10*3 === 0) {
        return `${size >> 10*2} Mb`
    } else {
        return `${size >> 10*3} Gb`
    }
};
