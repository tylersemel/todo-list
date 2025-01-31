import { CardUI } from "./card-ui";
import { DisplayManager, createElement } from "./display-manager";
//for the content area
const ProjectUI = (function() {
    const contentDiv = document.querySelector('.content');
    let projectNameH2;
    let _project;
    let cards = []; // need to add divs to this list, so that the data-index is reset for each project

    function addProject(project) {
        _project = project; 
        // project = new Project('title');
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

    function displayCardsHTML(project) {
        const todos = project.getAllTodos();

        for (const todo of todos) {
            const cardDiv = CardUI.createCardHTML();
            cardDiv.setAttribute('data-project-idx', DisplayManager.getProjects().indexOf(_project));
            const listSection = contentDiv.querySelector(`.${todo.status}`);
            const cardContainer = listSection.querySelector('.card-container');
            
            cardContainer.appendChild(cardDiv);
            CardUI.renderCard(cardDiv, todo);
            CardUI.addCardToList(cardDiv, listSection.classList[0], todo);
        }
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
        
        //after need to disable add task btn temporarily
        toggleAddTaskBtns();

        CardUI.createPendingCard(list);  
    }

    function addTodoToProject(title, list, cardDiv) {
        const todo = _project.createTodoItem(title, list);
        cardDiv.setAttribute('data-project-idx', DisplayManager.getProjects().indexOf(_project));
        return todo;
    }    

    function displayProject(project) {
        addProject(project);
        createOutlineHTML();
        displayProjectTitle(project.title);
        displayCardsHTML(project);
    }

    return { displayProject, addTodoToProject, toggleAddTaskBtns };

})();

export { ProjectUI };