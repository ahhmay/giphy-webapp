export const debounce = (fn, delay) => {
    let timer;
    // return function (input) {
    return (input) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(input)
        }, delay)
    }
}