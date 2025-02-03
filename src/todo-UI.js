import { DisplayManager } from "./display-manager";
import { CardUI } from "./card-ui.js";

const TodoUI = (() => {
    let _todo;
    let list;
    let _cardDiv;
    
    function createOutlineHTML() {
        dialog.innerHTML = 
        `<div class="todo-container">
            <div class="modal-top">
               <form action="" class="project-title-form">
                   <label for="project-title">In project</label>
                   <select name="project-title" id="project-title">
                        <option value="default">Default</option>
                        <option value="test">Test</option>
                   </select>
               </form>
               <button class="cancel">✖</button>
            </div>
            <div class="main-modal">
                <div class="main-info">
                    <div class="todo-title-container">
                        <span>Task</span>
                        <button class="todo-title">Title</button>
                    </div>
                    <div class="todo-title-container hidden">
                        <form action="" class="title-form">
                            <label for="todo-title">Task</label>
                            <input type="text" id="todo-title" name="todo-title" value="Title">
                            <button type="submit">Save</button>
                        </form>
                    </div>
                    <div class="description-container">
                        <span>Description</span>
                        <button class="description">Add a description...</button>
                    </div>
                    <div class="description-container hidden">
                        <form action="" class="description-form">
                            <label for="description">Description</label>
                            <textarea name="description" id="description"></textarea>
                            <button type="submit">Save</button>
                        </form>
                    </div>
                    <div class="list-container">
                        <form action="" class="list-form">
                            <label for="list">In list</label>
                            <select name="list" id="list">
                                <option value="todo">To do</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div class="side-info">
                    <div class="due-date-container">
                        <form action="" class="due-form">
                            <label for="due-date">Due</label>
                            <select name="due-date" id="due-date">
                            </select>
                        </form>
                    </div>
                    <div class="priority-container">
                        <form action="" class="priority-form">
                            <label for="priority">Priority</label>
                            <select name="priority" id="priority">
                                <option value="none">None</option>
                                <option value="important">Important</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        </form>
                    </div>
                    <button class="add-checklist">Add Checklist</button>
                    <button class="add-checklist hidden">Remove Checklist</button>
                </div>
            </div>
        </div>`;
    }

    const dialog = document.querySelector('dialog');

    function addEvents() {
        const titleBtn = document.querySelector('dialog .todo-title');
        const titleForm = document.querySelector('dialog .title-form');
        const cancel = document.querySelector('dialog .cancel');
        
        const descriptionForm = document.querySelector('dialog .description-form');
        const descriptionBtn = document.querySelector('dialog .description');
        
        const listSelect = document.querySelector('dialog .list-form select');

        dialog.className = 'todo-dialog';

        titleBtn.addEventListener('click', handleClickTodoTitle);
        titleForm.addEventListener('submit', handleSubmitTodoTitle);
        cancel.addEventListener('click', closeModal);
        descriptionForm.addEventListener('submit', handleSubmitDescription);
        descriptionBtn.addEventListener('click', handleClickDescription);
        listSelect.addEventListener('click', handleClickList);
    }

    function displayModal(cardDiv) {
        _cardDiv = cardDiv;
        const todoIdx = cardDiv.getAttribute('data-index');
        const projectIdx = cardDiv.getAttribute('data-project-idx');
        list = cardDiv.closest(`.list`).id;
        _todo = DisplayManager.getProjects()[projectIdx].getTodoFromList(list, todoIdx);
        console.log(_todo);
        
        createOutlineHTML();
        dialog.showModal();
        displayTodoTitle();
        displayDescription();
        displayList();
        addEvents();
    }
    
    function toggleHidden(elements) {
        for (const div of elements) {
            div.classList.toggle('hidden');
        }
    }
    
    function handleClickList(event) {
        const listForm = document.querySelector('dialog .list-form');
        const formData = new FormData(listForm);
        _todo.status = formData.get('list');

        moveCardToList();
    }

    function displayList() {
        const options = document.querySelectorAll('dialog .list option');
        const listSelect = document.querySelector('dialog .list-form select');

        for(const option of options) {
            if (option.value === _todo.status) {
                listSelect.selected = _todo
            }
        }
    }

    function moveCardToList(list) {
        CardUI.addCardToList(_cardDiv, list, _todo);
    }

    function handleClickDescription() {
        const descriptionContainers = document.querySelectorAll('.description-container');

        toggleHidden(descriptionContainers);
    }

    function displayDescription() {
        if (!_todo.description) {
           return;
        }
        const descriptionBtn = document.querySelector('dialog .description');
        descriptionBtn.textContent = _todo.description; 
        const descriptionInput = document.querySelector('#description');
        descriptionInput.value = _todo.description;
        descriptionInput.focus();
    }

    function handleSubmitDescription(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        _todo.description = formData.get('description');

        CardUI.updateDivDescription(_cardDiv, _todo.description);
        handleClickDescription();
        displayDescription();
    }

    function handleClickTodoTitle() {
        const todoTitleContainers = document.querySelectorAll('.todo-title-container');
    
        toggleHidden(todoTitleContainers);
    }

    function displayTodoTitle() {
        const titleBtn = document.querySelector('dialog .todo-title');
        titleBtn.textContent = _todo.title;

        const todoTitleInput = document.querySelector('#todo-title');
        todoTitleInput.value = _todo.title;
    }

    function handleSubmitTodoTitle(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        _todo.title = formData.get('todo-title');

        CardUI.updateDivTitle(_cardDiv, _todo.title);
        handleClickTodoTitle();
        displayTodoTitle();
    }

    function closeModal() {
        dialog.close();    
    }

    return { displayModal };
})();

export { TodoUI };