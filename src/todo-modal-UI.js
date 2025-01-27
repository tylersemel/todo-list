import { createElement } from "./create-element";
import { CardUI } from "./card-UI";

const TodoModalUI = (function() {
    const dialog = document.querySelector('dialog');
    let _card;

    function createFormHTML(todo) {

    }

    function createHTML(todo) {
        const todoContainerDiv = createElement('div', 'todo-container');
        const exitBtn = createElement('button', 'exit', '✖');
        exitBtn.addEventListener('click', closeModal);

        todoContainerDiv.appendChild(exitBtn);

        const todoDiv = createElement('div', 'todo');
        const todoInfoDiv = createElement('div', 'todo-info');

        const titleInfoDiv = createElement('div', 'title-info');
        const titleDiv = createElement('div', 'title', 'Title');
        titleDiv.setAttribute('contenteditable', 'true');
        titleDiv.addEventListener('keydown', setTodoTitle);
        titleInfoDiv.appendChild(titleDiv);

        titleDiv.textContent = todo.title;

        const listInfoDiv = createElement('div', 'list-info');
        const listSpan = createElement('span', 'list', 'in list');
        listInfoDiv.appendChild(listSpan);

        listSpan.textContent = `in list ${todo.getStatus()}`;

        const projectInfoDiv = createElement('div', 'project-info');
        const projectSpan = createElement('span', 'project', 'in project');
        projectInfoDiv.appendChild(projectSpan);

        projectSpan.textContent = `in project ${todo.projectName}`;

        const descriptionInfoDiv = createElement('div', 'description-info');
        const descriptionSpan = createElement('span', '', 'Description');
        const descriptionDiv = createElement('div', 'description');
        descriptionDiv.setAttribute('contenteditable', 'true');
        descriptionDiv.setAttribute('data-text', "Add a description...");
        descriptionDiv.addEventListener('keydown', setTodoDescription);

        descriptionInfoDiv.appendChild(descriptionSpan);
        descriptionInfoDiv.appendChild(descriptionDiv);

        if (todo.description) {
            descriptionDiv.textContent = todo.description;
        }

        const notesInfoDiv = createElement('div', 'notes-info');
        const notesSpan = createElement('span', '', 'Notes');
        const addNoteBtn = createElement('button', 'add-note', 'Add a note...');

        notesInfoDiv.appendChild(notesSpan);
        notesInfoDiv.appendChild(addNoteBtn);

        todoInfoDiv.appendChild(titleInfoDiv);
        todoInfoDiv.appendChild(listInfoDiv);
        todoInfoDiv.appendChild(projectInfoDiv);
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

    function setModalInfo() {

    }

    function loadModal(card) {
        if (!card) {
            return;
        }

        _card = card;

        clearModal();
        createHTML(card.todo);
        dialog.showModal();
    }

    function closeModal() {
        dialog.close();
    }

    function clearModal() {
        dialog.replaceChildren();
    }

    function setCardDiv(todo) {
        //only need to set title,due date, priority, and desc symbol
        // _card.cardDiv.updateTitle()
        CardUI.updateDivTitle(_card.cardDiv, todo.title);
        CardUI.updateDivDueDate(_card.cardDiv, todo.dueDate);
        CardUI.updateDivDescription(_card.cardDiv, todo.description);
    }

    function setTodo() {

    }

    function setTodoTitle(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            return;
        }
        else {
            _card.todo.title = event.target.textContent;
            setCardDiv(_card.todo);
        }
    }

    function setTodoDescription(event) {
        

        _card.todo.description = event.target.textContent;
        setCardDiv(_card.todo);
    }

    function setTodoNotes() {

    }

    function setTodoDueDate() {

    }

    function setTodoPriority() {

    }

    function moveTodo() {

    }

    return { loadModal, closeModal };
})();

export { TodoModalUI };

//need attacher and remover functions for certain html elements