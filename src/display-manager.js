import { Project } from "./project.js";
import { AllProjectsUI } from "./all-projects-page.js";
import { AllTasksPageUI } from "./all-tasks-page.js";
import { CardUI } from "./card-ui.js";
import { ProjectUI } from "./project-ui.js";

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
    let projectBtns = [];

    function addProject(title) {
        const project = new Project(title);
        console.log(project);
        projects.push(project);
        projectBtns.push(createSidebarProjectHTML(project, projects.length - 1));
        return project;
    }

    function createSidebarProjectHTML(project, idx) {
        const newProjectBtn = document.createElement('button');
        newProjectBtn.classList.add('child');
        newProjectBtn.classList.add('project-btn');
        newProjectBtn.setAttribute('data-index', idx);

        const createProjectBtn = document.querySelector('.create-project-btn');
        const projectsListDiv = document.querySelector('.projects-list');
        projectsListDiv.insertBefore(newProjectBtn, createProjectBtn);

        newProjectBtn.addEventListener('click', handleClickProjectBtn);
        newProjectBtn.textContent = project.title;
        return newProjectBtn;
    }

    function clearContent() {
        contentDiv.replaceChildren();
    }

    function handleClickProjectBtn(event) {
        const btn = event.target;
        const idx = btn.getAttribute('data-index');
        console.log(projects[idx]);
        console.log(idx);
        displayProject(projects[idx]);
    }

    function displayProject(project) {
        clearContent();
        ProjectUI.displayProject(project);
    }

    function displaySidebarProjectList() {
        
    }

    function getProjects() {
        return projects;
    }


    return { displayProject, addProject, clearContent, getProjects, handleClickProjectBtn };
    
})();

const SidebarUI = (() => {
    //manage all sidebar buttons
    const allProjectsBtn = document.querySelector('.your-projects-btn');
    allProjectsBtn.addEventListener('click', AllProjectsUI.handleClickAllProjectsBtn);

    const allTasksBtn = document.querySelector('.all-tasks-btn');
    allTasksBtn.addEventListener('click', AllTasksPageUI.handleClickAllTasksBtn);

})();

export { DisplayManager, createElement, SidebarUI };