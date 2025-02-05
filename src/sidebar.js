


const todayBtn = document.querySelector('.today-btn');
const allTasksBtn = document.querySelector('.all-tasks-btn');
const createTaskBtn = document.querySelector('.create-task-btn');
const allProjectsBtn = document.querySelector('.your-projects-btn');
const createProjectBtn = document.querySelector('.create-project-btn');

export function createSidebarProjectsHTML(project, idx) {
    const newProjectBtn = document.createElement('button');
    newProjectBtn.classList.add('child');
    newProjectBtn.classList.add('project-btn');
    newProjectBtn.setAttribute('data-index', idx);

    const createProjectBtn = document.querySelector('.create-project-btn');
    const projectsListDiv = document.querySelector('.projects-list');
    projectsListDiv.insertBefore(newProjectBtn, createProjectBtn);

    // newProjectBtn.addEventListener('click', DisplayManager.handleClickProjectBtn);
    newProjectBtn.textContent = project.title;
}