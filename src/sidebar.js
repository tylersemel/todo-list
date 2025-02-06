import { displayProject } from "./project-display";
import { getProject, setCurrentProject } from "./project-manager";

const todayBtn = document.querySelector('.today-btn');
const allTasksBtn = document.querySelector('.all-tasks-btn');
const createTaskBtn = document.querySelector('.create-task-btn');
const allProjectsBtn = document.querySelector('.your-projects-btn');
const createProjectBtn = document.querySelector('.create-project-btn');

function handleClickProjectBtn(event) {
    const button = event.target;
    //display that project
    //set that project to be current project
    const project = getProject(button.getAttribute('data-index'))
    displayProject(project);
    setCurrentProject(project);
}

export function createSidebarProjectsHTML(project, idx) {
    const newProjectBtn = document.createElement('button');
    newProjectBtn.classList.add('child');
    newProjectBtn.classList.add('project-btn');
    newProjectBtn.setAttribute('data-index', idx);

    const createProjectBtn = document.querySelector('.create-project-btn');
    const projectsListDiv = document.querySelector('.projects-list');
    projectsListDiv.insertBefore(newProjectBtn, createProjectBtn);

    newProjectBtn.addEventListener('click', handleClickProjectBtn);
    newProjectBtn.textContent = project.title;
}