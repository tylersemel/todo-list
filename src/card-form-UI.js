import { createElement } from "./create-element";

const CardFormUI = (function() {
    const dialog = document.querySelector('dialog');
    const form = createElement('form');

    function fillCardInfo(card) {

    }

    function createHTML() {
        form.setAttribute('method', 'POST');

        const closeBtn = createElement('button', 'close-btn', 'X');
        closeBtn.addEventListener('click', closeModal);
        const h1 = createElement('h1', '', 'Edit your task');
        const section = createElement('section');
        const p = createElement('p');
        const titleLabel = createElement('label', '', 'Title:');
        titleLabel.setAttribute('for', 'title');
        const titleInput = createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('id', 'title');
        titleInput.setAttribute('name', 'title');
        const submitBtn = createElement('button', 'submit', 'Save');
        submitBtn.setAttribute('type', 'submit');

        p.appendChild(titleLabel);
        p.appendChild(titleInput);
        section.appendChild(p);
        form.appendChild(h1);
        dialog.appendChild(closeBtn);
        form.appendChild(section);
        form.appendChild(submitBtn);
        dialog.appendChild(form);
    }

    function showModal() {
        dialog.showModal();
    }

    function closeModal() {
        dialog.close();
    }

    function loadModal() {
        createHTML();
    }

    // form.addEventListener('submit')

    loadModal();

    return { showModal, closeModal, fillCardInfo };
})();

export { CardFormUI };