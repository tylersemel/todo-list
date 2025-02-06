import { createElement } from "./create-element.js";
import { createPendingCard, createCardHTML, renderCard } from "./card-ui.js";
import { contentDiv } from "./display-DOM.js";

//add events to all of the project display elements that need it
function addEvents() {
    const projectPageContainer = document.querySelector('.project-page');
    projectPageContainer.addEventListener('addCard', handleAddCard);
    const addTaskBtns = projectPageContainer.querySelectorAll('.add-task');

    for (const addTaskBtn of addTaskBtns) {
        addTaskBtn.addEventListener('click', handleClickAddTask);
    }
}

function handleAddCard(e) {
    console.log("to add a card?");
    const cardDiv = createCardHTML();
    renderCard(cardDiv)

}

//find the list the task btn is apart of and then disable while user
//interacts with pending card
function handleClickAddTask(event) {
    const addTaskBtn = event.target;
    const listSection = addTaskBtn.closest('section');
    const list = listSection.id; 

    createPendingCard(list);     
}

function createProjectPageHTML(project) {
    const projectPageContainer = createElement('div', 'project-page');
    
    const projectNameH2 = createElement('h2', 'project-name');
    projectPageContainer.appendChild(projectNameH2);
    projectNameH2.textContent = project.title;

    const listsDiv = createElement('div', 'lists');
    const listSections = [];
    listSections.push(createElement('section'));
    listSections[0].id = 'todo';
    listSections.push(createElement('section'));
    listSections[1].id = 'doing';
    listSections.push(createElement('section'));
    listSections[2].id = 'done';

    for (let i = 0; i < listSections.length; i++) {
        let text = 'To do';
        if (i === 1) text = 'Doing';
        if (i === 2) text = 'Done';

        listSections[i].classList.add('list');
        listSections[i].appendChild(createElement('h3', '', text));
        listSections[i].appendChild(createElement('div', 'card-container'));

        let addTaskBtn = createElement('button', 'add-task', '+ Add a task');
        // addTaskBtn.addEventListener('click', handleAddTaskClick);
        
        listSections[i].appendChild(addTaskBtn);
        listsDiv.appendChild(listSections[i]);
    }

    projectPageContainer.appendChild(listsDiv);
    contentDiv.appendChild(projectPageContainer);
}

function displayCards(todos) {
    //create html for these
}

function getCards() {
    const cards = [];

    for (const section of listSections) {
        const cardContainerDiv = section.querySelector('.card-container');

        // for (const )
    }
}

function getTodoCards() {
    const section = contentDiv.querySelector
}

function getDoingCards() {

}

function getDoneCards() {

}

export function displayProject(project) {
    createProjectPageHTML(project);
    addEvents();
}
