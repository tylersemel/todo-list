export const createElement = (elem, className, text) => {
    const element = document.createElement(elem);
    if (className) element.classList.add(className);
    if (text) element.textContent = text;
    return element;
}