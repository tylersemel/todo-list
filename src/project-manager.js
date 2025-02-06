import { Project } from "./project";

let projects = [];
let defaultProject = new Project('Unsorted');
projects.push(defaultProject);
let currentProject = defaultProject;

export function getProjects() {
    return projects;
}

export function getProject(index) {
    if (index < 0 || index > projects.length - 1) {
        return;
    }
    return projects[index];
}

export function createProject(title) {
    return new Project(title);
}

export function addProject(project) {
    projects.push(project);
}

export function getDefaultProject() {
    return defaultProject;
}

export function getCurrentProject() {
    return currentProject;
}

export function setCurrentProject(project) {
    currentProject = project;
}

function loadProjects() {

}

export function addTodoToProject({title, list}) {
    getCurrentProject().createTodo(title, list);

    const addCardEvent = new CustomEvent('addCard');
    const projectPageContainer = document.querySelector('.project-page');
    projectPageContainer.dispatchEvent(addCardEvent, {
        detail: {
            todo
        }});

    console.log("all todos in current proj: " + getCurrentProject().getAllTodos()[0].title);
}

document.addEventListener('addTodoFromPendingCard', addTodoToProject);