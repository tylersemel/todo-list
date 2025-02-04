import { DisplayManager } from "./display-manager";
import { CardUI } from "./card-ui.js";
import { format } from "date-fns";

const TodoUI = (() => {
    let _todo;
    let list;
    let _cardDiv;
    let projectIdx;
    
    function createOutlineHTML() {
        dialog.innerHTML = 
        `<div class="todo-container">
            <div class="modal-top">
               <form action="" class="project-title-form">
                   <label for="project-title">In project</label>
                   <select name="project-title" id="project-title">
                        
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
                            <input type="date" id="due-date" name="due-date" value="2018-07-22" min="2025-01-01" max="2100-12-31" />
                        </form>
                    </div>
                    <div class="priority-container">
                        <form action="" class="priority-form">
                            <label for="priority">Priority</label>
                            <select name="priority" id="priority">
                                <option value="none">None</option>
                                <option value="important">Important</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </form>
                    </div>
                    <button class="add-checklist">Add Checklist</button>
                    <button class="add-checklist hidden">Remove Checklist</button>
                </div>
            </div>
        </div>`;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = 'Delete Todo';
        deleteBtn.addEventListener('click', handleClickDelete);

        dialog.appendChild(deleteBtn);

    }

    const dialog = document.querySelector('dialog');

    function addEvents() {
        const titleBtn = document.querySelector('dialog .todo-title');
        const titleForm = document.querySelector('dialog .title-form');
        const cancel = document.querySelector('dialog .cancel');
        
        const descriptionForm = document.querySelector('dialog .description-form');
        const descriptionBtn = document.querySelector('dialog .description');
        
        const listSelect = document.querySelector('dialog .list-form select');

        const projectSelect = document.querySelector('dialog #project-title');

        const description = document.querySelector('dialog textarea');
        const descSaveBtn = document.querySelector('dialog .description-container button[type=submit]')
        dialog.className = 'todo-dialog';

        const prioritySelect = document.querySelector('dialog #priority');

        const dueDateInput = document.querySelector('dialog #due-date');

        titleBtn.addEventListener('click', handleClickTodoTitle);
        titleForm.addEventListener('submit', handleSubmitTodoTitle);
        cancel.addEventListener('click', closeModal);
        descriptionForm.addEventListener('submit', handleSubmitDescription);
        descriptionBtn.addEventListener('click', handleClickDescription);
        listSelect.addEventListener('input', handleClickList)
        description.addEventListener('input', CardUI.autoResize);
        description.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                descSaveBtn.click();
            }
        });

        projectSelect.addEventListener('input', handleClickProject);
        prioritySelect.addEventListener('input', handleClickPriority);
        dueDateInput.addEventListener('input', handleClickDueDate);
    }

    function toggleHidden(elements) {
        for (const div of elements) {
            div.classList.toggle('hidden');
        }
    }

    function handleClickDelete(event) {
        const project = DisplayManager.getProjects()[projectIdx];

        project.removeTodo(_todo);

        closeModal();

        DisplayManager.displayProject(project);
    }

    function handleClickDueDate() {
        const dueForm = document.querySelector('dialog .due-form');
        const formData = new FormData(dueForm);
        const project = DisplayManager.getProjects()[projectIdx];
        
        if (formData.get('due-date')) {
            _todo.dueDate = formData.get('due-date');
        }
        else {
            _todo.dueDate = '';
        }

        DisplayManager.displayProject(project);
    }

    function displayDueDate() {
        const dueDateInput = document.querySelector('dialog #due-date');

        if (!_todo.dueDate) {
            dueDateInput.value = "yyyy-MM-dd";
        }
        else {
           dueDateInput.value =  format(_todo.dueDate, "yyyy-MM-dd");
        }   
    }

    function handleClickPriority(event) {
        const priorityForm = document.querySelector('dialog .priority-form');
        const formData = new FormData(priorityForm);
        console.log(formData.get('priority'));
        _todo.priority = formData.get('priority');
        const project = DisplayManager.getProjects()[projectIdx];
        DisplayManager.displayProject(project);
    }

    function displayPriority() {
        const options = document.querySelectorAll('dialog #priority option');
        
        for(const option of options) {
            if (option.value === _todo.priority) {
                option.selected = _todo.priority;
            }
        }
    }

    function handleClickProject(event) {
        const listForm = document.querySelector('dialog .project-title-form');
        const formData = new FormData(listForm);
        console.log(formData.get('project-title'));
        
        const options = document.querySelectorAll('dialog #project-title option');
        let idx = 0;
        for(const option of options) {
            if (option.selected) {
                idx = option.getAttribute('data-project-index');
                console.log(idx);
            }
        }

        const project = DisplayManager.getProjects()[idx];
        const list = project.checkWhichList(_todo.status);
        const originalProject = DisplayManager.getProjects()[projectIdx];
        originalProject.removeTodo(_todo);
        project.addTodoToList(_todo, list);
        projectIdx = idx;
        DisplayManager.displayProject(project);
    }

    function displayProject() {
        const projectSelect = document.querySelector('dialog #project-title');
        let idx = 0;

        for (const project of DisplayManager.getProjects()) {
            const option = document.createElement('option');
            option.value = project.title;
            option.textContent = project.title;
            option.setAttribute('data-project-index', idx);
            projectSelect.appendChild(option);
            idx++;
        }

        const options = document.querySelectorAll('dialog #project-title option');
        const project = DisplayManager.getProjects()[projectIdx];
        for(const option of options) {
            if (option.value === project.title) {
                option.selected = project.title;
            }
        }
    }
    
    function handleClickList(event) {
        const listForm = document.querySelector('dialog .list-form');
        const formData = new FormData(listForm);
        
        _todo.status = formData.get('list');
        const project = DisplayManager.getProjects()[projectIdx];
        const list = project.checkWhichList(_todo.status);
        project.addTodoToList(_todo, list);
        DisplayManager.displayProject(project);
    }

    function displayList() {
        const options = document.querySelectorAll('dialog #list option');
        
        for(const option of options) {
            if (option.value === _todo.status) {
                option.selected = _todo.status;
            }
        }
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
        dialog.className = '';
        dialog.replaceChildren();
        dialog.close();    
    }    
    
    function displayModal(cardDiv) {
        _cardDiv = cardDiv;
        const todoIdx = cardDiv.getAttribute('data-index');
        projectIdx = cardDiv.getAttribute('data-project-idx');
        list = cardDiv.closest(`.list`).id;
        _todo = DisplayManager.getProjects()[projectIdx].getTodoFromList(list, todoIdx);
        
        createOutlineHTML();
        dialog.showModal();

        displayTodoTitle();
        displayDescription();
        displayList();
        displayProject();
        displayPriority();
        displayDueDate();
        addEvents();
    }

    return { displayModal };
})();

export { TodoUI };