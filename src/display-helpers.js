export function autoResize(event) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
}