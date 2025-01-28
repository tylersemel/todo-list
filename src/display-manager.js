import { Project } from "./project.js";
import { Todo } from "./todo";

//put all display stuff in here for now.
const createElement = (elem, className, text) => {
    const element = document.createElement(elem);
    if (className) element.classList.add(className);
    if (text) element.textContent = text;
    return element;
}

const contentDiv = document.querySelector('.content');

//managing displaying projects
//projects created outside of here in index
const DisplayManager = (() => {
    let projects = [];

    function addProject(project) {
        projects.push(project);
    }

    function clearContent() {
        contentDiv.replaceChildren();
    }

    function displayProject(project) {
        // ProjectUI.addProject(project);
        clearContent();
        ProjectUI.displayProject(project);
    }


    return { displayProject, addProject };
    
})();

const ProjectUI = (function() {
    let projectNameH2;
    let project;
    // function addProject(title) {
    //     project = createProject(title);
    // }

    // function displayToDoList(todoList) {

    // }

    // function displayDoingList(doingList) {

    // }

    function addProject(project) {
        // project = new Project('Default');
    }

    function displayProjectTitle(title) {
        projectNameH2.textContent = title;
    }

    function createOutlineHTML() {
        projectNameH2 = createElement('h2', 'project-name');
        contentDiv.appendChild(projectNameH2);

        const listsDiv = createElement('div', 'lists');

        const listSections = [];
        listSections.push(createElement('section', 'todo'));
        listSections.push(createElement('section', 'doing'));
        listSections.push(createElement('section', 'done'));

        for (let i = 0; i < listSections.length; i++) {
            let text = 'To do';
            if (i === 1) text = 'Doing';
            if (i === 2) text = 'Done';

            listSections[i].classList.add('list');
            listSections[i].appendChild(createElement('h3', '', text));
            listSections[i].appendChild(createElement('div', 'card-container'));

            let addTaskBtn = createElement('button', 'add-task', '+ Add a task');
            addTaskBtn.addEventListener('click', handleAddTask);
            
            listSections[i].appendChild(addTaskBtn);
            listsDiv.appendChild(listSections[i]);
        }

        contentDiv.appendChild(listsDiv);
    }

    function displayCardsHTML(project) {
        const todos = project.getAllTodos();

        for (const todo of todos) {
            const cardDiv = CardUI.createCardHTML();
            const listSection = contentDiv.querySelector(`.${todo.status}`);
            const cardContainer = listSection.querySelector('.card-container');
            console.log(cardContainer);
            cardContainer.appendChild(cardDiv);
            CardUI.renderCardInfo(cardDiv, todo);
        }
    }

    // function disableAddTaskBtn() {

    // }

    function handleAddTask(event) {
        let count = CardUI.getCards().length;

        const list = event.target.closest('section').classList[0];
        //create a todo beforehand and then populate it in if the card gets saved?
        // const todo = project.createTodoItem('', list);
        const newCardDiv = CardUI.createPendingCard(list);  
    }

    // function addTodoToProject(project, todo) {
    //     project.createT
    // }



    function displayProject(project) {
        createOutlineHTML();
        displayProjectTitle(project.title);
        displayCardsHTML(project);
    }

    return { displayProject };

})();


//could have cardUImanager and CardUIFactory be different things
//cardmanager would hold list of cards 

const CardUI = (function() {
    let cards = [];
    let project;

    function updateDivTitle(card, title) {
        card.querySelector('.title').textContent = title;
    }

    function updateDivDueDate(card, dueDate) {
        card.querySelector('.due-date').textContent = dueDate;
    }

    function updateDivPriority(card, priority) {
        card.querySelector('.priority').textContent = priority;
    }

    function updateDivDescription(card, hasDescription) {
        if (hasDescription) {
            card.querySelector('.has-description').textContent = 'More';
        }
        else {
            card.querySelector('.has-description').textContent = '';
        }
    }

    function createCardHTML() {
        const cardInfo = createElement('div', 'card-info');
    
        const dueDateDiv = createElement('div', 'due-date');
        const priorityFlag = createElement('div', 'priority');
        const hasDescriptDiv = createElement('div', 'has-description');
    
        const symbolsDiv = createElement('div', 'symbols');
        symbolsDiv.appendChild(dueDateDiv);
        symbolsDiv.appendChild(priorityFlag);
        symbolsDiv.appendChild(hasDescriptDiv);
    
        const titleDiv = createElement('span', 'title');
        
        cardInfo.appendChild(titleDiv);
        cardInfo.appendChild(symbolsDiv);

        const cardDiv = createElement('div', 'card');
        cardDiv.appendChild(cardInfo);
        cardDiv.addEventListener('click', handleCardClick);

        return cardDiv;
    }

    function handleCardClick(event) {
        let cardDiv = event.target.closest('.card');
        console.log(cardDiv);
        TodoModalUI.loadModal(cards[cardDiv.getAttribute('data-index')]);
    }

    function addCardToList(cardDiv, todo, list) {
        const listDiv = contentDiv.querySelector(`.${list}`);
        const cardContainerDiv = listDiv.querySelector('.card-container');

        cardContainerDiv.appendChild(cardDiv);
        cardDiv.setAttribute('data-index', cards.length);
        let card = { cardDiv, todo };
        cards.push(card);
    }

    function renderCardInfo(card, todo) {
        console.log(todo.title.length);

        card.querySelector('.title').textContent = todo.title;
    }

    function getCards() {
        return cards;
    }

    function deleteCard(card) {
        card.parentNode.removeChild(card);
        cards.splice(cards.indexOf(card), 1);
    }

    function focusOnCard(card) {
        const textArea = card.querySelector('.title');
        textArea.focus();
    }


    function autoResize(event) {
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
        console.log(event.target.style.height);
    }

    /** PENDING CARD HTML AND FUNCTIONALITY */

    function removePendingCard(listSection) {
        const cardContainer = listSection.querySelector('.card-container');
        const child = cardContainer.querySelector('.new-card');
        cardContainer.removeChild(child);
    }

    function createCardDiv(todo, listSection) {
        const cardDiv = createCardHTML();
        addCardToList(cardDiv, todo, listSection.classList[0]);
        renderCardInfo(cardDiv, todo);
        removePendingCard(listSection);
    }

    
    //save pending card === save info to the project's given list of todos
    //then close out the pending card and create the finalized card, display that card
    function handleSavePendingCard(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const listSection = event.target.closest('.list');

        //create todo
        if (formData.get('title') === '') {
            removePendingCard(listSection);
            return;
        }

        // const todo = event.target.todo;
        // todo.title = formData.get('title');
        
        //add data to a new card
        //add that card to the list
        //have the project ui module access that newest card and create a todo in that project

        //create cardDiv
        // createCardDiv(listSection);
    }
        
    function handleCancelPendingCard(event) {
        removePendingCard(event.target.closest('.list'));
    }

    function createPendingCard(list) {
        const newCardDiv = createElement('div', 'new-card');

        const newCardForm = createElement('form');
        newCardForm.setAttribute('method', 'POST');
        newCardForm.addEventListener('submit', handleSavePendingCard);

        const titleTextArea = createElement('textarea', 'title');
        titleTextArea.setAttribute('name', 'title');
        titleTextArea.addEventListener('input', autoResize)

        const saveBtn = createElement('button', 'save', 'ᯓ➤');
        saveBtn.setAttribute('title', 'Save');
        saveBtn.setAttribute('type', 'submit');

        titleTextArea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveBtn.click();
            }
        });

        newCardForm.appendChild(titleTextArea);
        newCardForm.appendChild(saveBtn);
        newCardDiv.appendChild(newCardForm);

        const cancelBtn = createElement('button', 'cancel', '✖');
        cancelBtn.setAttribute('title', 'Cancel');
        cancelBtn.addEventListener('click', handleCancelPendingCard);
        newCardDiv.appendChild(cancelBtn);

        const listDiv = contentDiv.querySelector(`.${list}`);
        const cardContainerDiv = listDiv.querySelector('.card-container');

        cardContainerDiv.appendChild(newCardDiv);
        focusOnCard(newCardDiv);
        return newCardDiv;
    }

    return { 
        updateDivTitle,
        updateDivDueDate,
        updateDivPriority,
        updateDivDescription,
        getCards,
        createPendingCard,
        createCardHTML,
        renderCardInfo,
        project
    };
})();

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
});

//Maybe throw out
// const PageController = (function() {
//     //in charge of sidebar projects
//     let projects = [];
//     // let defaultProject;
//     //singleton
//     // let ProjectUI = ProjectUI();
//     const contentDiv = document.querySelector('.content');
//     const generalBtn = document.querySelector('.general-proj-btn');
//     generalBtn.addEventListener('click', handleGeneralBtnClick );

//     const defaultProject = ProjectUI.addProject('Default');

    

//     function displayGeneralProjectPage() {
//         ProjectUI.displayProject('Default');
//     }

//     function handleGeneralBtnClick() {
//         clearContent();
//         displayGeneralProjectPage();
//     }

//     function clearContent() {
//         contentDiv.replaceChildren();
//     }

//     return { 
//         projects,
//         displayGeneralProjectPage 
//     }

// })();

export { DisplayManager };