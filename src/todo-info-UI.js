import { createElement } from "./create-element";
import { CardUI } from "./card-UI";

const TodoInfoUI = (function() {
    const dialog = document.querySelector('dialog');
    const form = createElement('form');

    function fillCardInfo(card) {

    }

    function createHTML() {
        const todoContainerDiv = createElement('div', 'todo-container');
        const exitBtn = createElement('button', 'exit', 'X');

        todoContainerDiv.appendChild(exitBtn);

        const todoDiv = createElement('div', 'todo');
        const todoInfoDiv = createElement('div', 'todo-info');

        const titleInfoDiv = createElement('div', 'title-info');
        const titleDiv = createElement('div', 'title', 'Title');
        titleDiv.setAttribute('contenteditable', 'true');
        titleInfoDiv.appendChild(titleDiv);

        const listInfoDiv = createElement('div', 'list-info');
        const listSpan = createElement('span', 'list', 'in list');
        listInfoDiv.appendChild(listSpan);

        const descriptionInfoDiv = createElement('div', 'description-info');
        const descriptionSpan = createElement('span', '', 'Description');
        const descriptionBtn = createElement('button', 'description', 'Add a description...');
        descriptionInfoDiv.appendChild(descriptionSpan);
        descriptionInfoDiv.appendChild(descriptionBtn);

        const notesInfoDiv = createElement('div', 'notes-info');
        const notesSpan = createElement('span', '', 'Notes');
        const addNoteBtn = createElement('button', 'add-note', 'Add a note...');

        notesInfoDiv.appendChild(notesSpan);
        notesInfoDiv.appendChild(addNoteBtn);

        todoInfoDiv.appendChild(titleInfoDiv);
        todoInfoDiv.appendChild(listInfoDiv);
        todoInfoDiv.appendChild(descriptionInfoDiv);
        todoInfoDiv.appendChild(notesInfoDiv);

        todoDiv.appendChild(todoInfoDiv);

        const todoSidebarDiv = createElement('div', 'todo-sidebar');

        const moveInfoDiv = createElement('div', 'move-info');
        const moveTodoBtn = createElement('button', 'move-todo', 'Move to');
        moveInfoDiv.appendChild(moveTodoBtn);

        const dueDateInfoDiv = createElement('div', 'due-date-info');
        const dueDateSpan = createElement('span', '', 'Due date');
        const dueDateBtn = createElement('button', 'due-date', 'Jan 3, 2025');
        dueDateInfoDiv.appendChild(dueDateSpan);
        dueDateInfoDiv.appendChild(dueDateBtn);
        
        const priorityInfoDiv = createElement('div', 'priority-info');
        const prioritySpan = createElement('span', '', 'Priority');
        const priorityBtn = createElement('button', 'priority', 'None');
        priorityInfoDiv.appendChild(prioritySpan);
        priorityInfoDiv.appendChild(priorityBtn);

        todoSidebarDiv.appendChild(moveInfoDiv);
        todoSidebarDiv.appendChild(dueDateInfoDiv);
        todoSidebarDiv.appendChild(priorityInfoDiv);
     
        todoDiv.appendChild(todoSidebarDiv);
        todoContainerDiv.appendChild(todoDiv);
        dialog.appendChild(todoContainerDiv);
    }



    function showModal(card) {
        dialog.showModal();
        fillCardInfo(card.todo);
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

export { TodoInfoUI };

//need attacher and remover functions for certain html elements