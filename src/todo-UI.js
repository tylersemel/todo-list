import { DisplayManager } from "./display-manager";
import { CardUI } from "./card-ui.js";

const TodoUI = (() => {
    const titleBtn = document.querySelector('dialog .todo-title');
    const titleForm = document.querySelector('dialog .title-form');
    const cancel = document.querySelector('dialog .cancel');
    const dialog = document.querySelector('dialog');
    const descriptionForm = document.querySelector('dialog .description-form');
    const descriptionBtn = document.querySelector('dialog .description');
    const listForm = document.querySelector('dialog .list-form');
    const listSelect = document.querySelector('dialog .list-form select');

    let _todo;
    let cardDiv;

    function addEvents() {
        dialog.className = 'todo-dialog';

        titleBtn.addEventListener('click', handleClickTodoTitle);
        titleForm.addEventListener('submit', handleSubmitTodoTitle);
        cancel.addEventListener('click', closeModal);
        descriptionForm.addEventListener('submit', handleSubmitDescription);
        descriptionBtn.addEventListener('click', handleClickDescription);
        listSelect.addEventListener('click', handleClickList);
    }

    addEvents();

    //this has been fired from the CardUI, maybe should move back there
    function handleClickTodo(event) {
        cardDiv = event.target.closest('.card');
        _todo = DisplayManager.getProjects()[0].getAllTodos()[0]; // thgis is wrong but just to test
        console.log(cardDiv);
        // createModalHTML(cardDiv);
        
        dialog.showModal();
        displayTodoTitle();
        displayDescription();
        displayList();
    }
    
    function toggleHidden(elements) {
        for (const div of elements) {
            div.classList.toggle('hidden');
        }
    }
    
    function handleClickList(event) {
        const formData = new FormData(listForm);
        _todo.status = formData.get('list');

        moveCardToList();
    }

    function displayList() {
        const options = document.querySelectorAll('dialog .list option');

        for(const option of options) {
            if (option.value === _todo.status) {
                listSelect.selected = _todo
            }
        }
    }

    function moveCardToList(list) {
        CardUI.addCardToList(cardDiv, list, _todo);
    }

    function handleClickDescription() {
        const descriptionContainers = document.querySelectorAll('.description-container');

        toggleHidden(descriptionContainers);
    }

    function displayDescription() {
        if (!_todo.description) {
           return;
        }
        descriptionBtn.textContent = _todo.description; 
        const descriptionInput = document.querySelector('#description');
        descriptionInput.value = _todo.description;
        descriptionInput.focus();
    }

    function handleSubmitDescription(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        _todo.description = formData.get('description');

        CardUI.updateDivDescription(cardDiv, _todo.description);
        handleClickDescription();
        displayDescription();
    }

    function handleClickTodoTitle() {
        const todoTitleContainers = document.querySelectorAll('.todo-title-container');
    
       toggleHidden(todoTitleContainers);
    }

    function displayTodoTitle() {
        titleBtn.textContent = _todo.title;

        const todoTitleInput = document.querySelector('#todo-title');
        todoTitleInput.value = _todo.title;
    }

    function handleSubmitTodoTitle(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        _todo.title = formData.get('todo-title');

        CardUI.updateDivTitle(cardDiv, _todo.title);
        handleClickTodoTitle();
        displayTodoTitle();
    }

    function closeModal() {
        dialog.close();    
    }

    return { handleClickTodo };
})();

export { TodoUI };