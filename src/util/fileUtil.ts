const KB = 1000;
const MB = Math.pow(KB, 2);
const GB = Math.pow(KB, 3);


export const formatBytes = (bytes: number) => {
    if (bytes < KB) return bytes + " bytes";
    else if (bytes < MB) return (bytes / KB).toFixed(3) + " kb";
    else if (bytes < GB) return (bytes / MB).toFixed(3) + " mb";
    else return (bytes / GB).toFixed(3) + " gb";
};
