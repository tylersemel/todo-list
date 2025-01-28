import { createElement } from "./create-element";
import { CardUI } from "./card-UI";
import { createProject } from "./create-project";

//i dont think this needs to be this way
//might just do a singleton that loads the html
//and then do a function to set the state of which project is supposed
//to be displayed

const ProjectUI = (function() {
    const contentDiv = document.querySelector('.content');
    let projectNameH2;
    let cardUI = CardUI();
    let project;

    function displayProject(title) {
        project = createProject(title);
        // cardUI.project = project;
        createHTML();
        displayProjectTitle(project.title);

    }

    function displayToDoList(todoList) {

    }

    function displayDoingList(doingList) {

    }

    function displayProjectTitle(title) {
        projectNameH2.textContent = title;
    }

    function createHTML() {
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

    function handleAddTask(event) {
        console.log(event.target.closest('section').classList[0]);
        const list = event.target.closest('section').classList[0];
        //create a todo beforehand and then populate it in if the card gets saved?
        const todo = project.createTodoItem('', list);
        cardUI.createPendingCard(todo, list);
    }

    return { displayProject };

})();


export { ProjectUI };