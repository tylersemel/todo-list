import { CardUI } from "./card-ui";
import { DisplayManager, createElement } from "./display-manager";
import { TodoUI } from "./todo-UI";
import { STATUS } from "./todo";
//for the content area
const ProjectUI = (function() {
    const contentDiv = document.querySelector('.content');
    let projectNameH2;
    let _project;
     // need to add divs to this list, so that the data-index is reset for each project
    let todoCards = [];
    let doingCards = [];
    let doneCards = [];
    let cards = [todoCards, doingCards, doneCards];

    function addProject(project) {
        _project = project; 
    }

    function getProject() {
        return _project;
    }

    function displayProjectTitle(title) {
        projectNameH2.textContent = title;
    }

    function createOutlineHTML() {
        const projectPageContainer = createElement('div', 'project-page');
        
        projectNameH2 = createElement('h2', 'project-name');
        projectPageContainer.appendChild(projectNameH2);
        

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
            addTaskBtn.addEventListener('click', handleAddTaskClick);
            
            listSections[i].appendChild(addTaskBtn);
            listsDiv.appendChild(listSections[i]);
        }

        projectPageContainer.appendChild(listsDiv);
        contentDiv.appendChild(projectPageContainer);
    }

    function displayCards() {
        const todos = getProject().getAllTodos();

        for (const todo of todos) {
            const cardDiv = displayCard(todo.status);
            addTodoInfoToCard(cardDiv, todo);
        }
    }

    function addTodoInfoToCard(cardDiv, todo) {
        //render todo info on card
        CardUI.renderCard(cardDiv, todo);
        let projectIdx = DisplayManager.getProjects().indexOf(getProject());

        //add card to cards list
        switch (todo.status) {
            case STATUS[0]:
                CardUI.setCardAttributes(cardDiv, todoCards.length, projectIdx);
                break;
            case STATUS[1]:
                CardUI.setCardAttributes(cardDiv, doingCards.length, projectIdx);
                break;
            case STATUS[2]:
                CardUI.setCardAttributes(cardDiv, doneCards.length, projectIdx);
                break;
        }
    }

    function displayCard(listClass) {
        const cardDiv = CardUI.createCardHTML();
        const listSection = contentDiv.querySelector(`.${listClass}`);
        const cardContainer = listSection.querySelector('.card-container');
        
        cardContainer.appendChild(cardDiv);

        switch (listClass) {
            case STATUS[0]:
                addCard(cardDiv, todoCards);
                break;
            case STATUS[1]:
                addCard(cardDiv, doingCards);
                break;
            case STATUS[2]:
                addCard(cardDiv, doneCards);
                break;
        }

        return cardDiv;
    }

    function toggleAddTaskBtns() {
        const addTaskBtns = contentDiv.querySelectorAll('.add-task');

        for (const addTaskBtn of addTaskBtns) {
            addTaskBtn.disabled = !addTaskBtn.disabled;
            addTaskBtn.classList.toggle('disabled');
        }
    }

    function handleAddTaskClick(event) {
        const listSection = event.target.closest('section');
        const list = listSection.classList[0]; //may need to change to individual lists later
        //just make it an id
        
        //after need to disable add task btn temporarily
        toggleAddTaskBtns();

        CardUI.createPendingCard(list);  
    }

    function addTodoToProject(title, list) {
        const todo = _project.createTodoItem(title, list);
        console.log(todo.title);

        const cardDiv = displayCard(list);
        addTodoInfoToCard(cardDiv, todo);

        return todo;
    } 
    
    function addCard(card, cardList) {
        // if (cardList.indexOf(card) !== -1) {
            cardList.push(card);
        // }
    }

    function getCards() {
        return cards;
    }

    function displayProject(project) {
        todoCards = [];
        doingCards = [];
        doneCards = [];

        addProject(project);
        createOutlineHTML();
        displayProjectTitle(project.title);

        displayCards();
    }

    return { displayProject, addTodoToProject, toggleAddTaskBtns, getCards };

})();

export { ProjectUI };