import { Project } from "./project";

let projects = [];
let defaultProject = new Project('Unsorted');
projects.push(defaultProject);
let currentProject = defaultProject;

export function getProjects() {
    return projects;
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

function addTodoToProject(event) {
    getCurrentProject().createTodo(event.detail.title, event.detail.list);
    console.log(getCurrentProject().getAllTodos());
}

document.addEventListener('savePendingCard', addTodoToProject);