export const errorHandler = (err: Error, message?: string) => {
    if (message) {
        console.error(`${message}`, err);
    } else {
        console.error(err);
    }
    process.exit(1);
};