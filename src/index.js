import { todoItemManager } from "./todo-manager.js";
import { createProject } from "./create-project.js";
import { GeneralPageModule } from "./general-page-UI.js";
import "./styles.css";

const generalPageBtn = document.querySelector('.general-proj-btn');
generalPageBtn.addEventListener('click', loadGeneralPage);

//start page
GeneralPageModule.loadPage();

function loadGeneralPage() {
    clearContent();
    GeneralPageModule.loadPage();
}

function clearContent() {
    const contentDiv = document.querySelector('.content');
    contentDiv.replaceChildren();
}








// let projectsList = [];
// const generalProject = createProject('General', 'Tasks with no project goes here!');
// projectsList.push(generalProject);

// let todo1 = todoItemManager.createTodoItem('Go to the store', 'Buy milk, eggs, beef', '01-21-2025', '', 'DOING');
// let todo2 = todoItemManager.createTodoItem('Eat grocercies');
// let todo3 = todoItemManager.createTodoItem('Have fun');


// let myProject = createProject('tite');
// let myProject2 = createProject('2');

// myProject.addTodoToList(todo1);
// myProject.addTodoToList(todo2);
// myProject.addTodoToList(todo3);

// myProject2.addTodoToList(todo2);

// myProject.removeTodoFromList(todo2);

// myProject.printAllTodos();