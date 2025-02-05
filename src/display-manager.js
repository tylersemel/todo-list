import { Project } from "./project.js";
import { AllProjectsUI } from "./all-projects-page.js";
import { AllTasksPageUI } from "./all-tasks-page.js";
import { ProjectUI } from "./project-ui.js";
import { CreateProjectModal } from "./create-project-modal";
import { CreateTaskModal } from "./create-task-modal.js";
import { TodayTasksPageUI } from "./today-tasks-page.js";
import { Storage } from "./storage.js";
//put all display stuff in here for now.
const createElement = (elem, className, text) => {
    const element = document.createElement(elem);
    if (className) element.classList.add(className);
    if (text) element.textContent = text;
    return element;
}

const SidebarUI = (() => {
    //manage all sidebar buttons
    const todayBtn = document.querySelector('.today-btn');
    todayBtn.addEventListener('click', TodayTasksPageUI.handleClickTodayBtn);

    const allTasksBtn = document.querySelector('.all-tasks-btn');
    allTasksBtn.addEventListener('click', AllTasksPageUI.handleClickAllTasksBtn);

    const createTaskBtn = document.querySelector('.create-task-btn');
    createTaskBtn.addEventListener('click', CreateTaskModal.handleClickCreateModal);

    const allProjectsBtn = document.querySelector('.your-projects-btn');
    allProjectsBtn.addEventListener('click', AllProjectsUI.handleClickAllProjectsBtn);

    const createProjectBtn = document.querySelector('.create-project-btn');
    createProjectBtn.addEventListener('click', CreateProjectModal.displayModal);

    function createSidebarProjectHTML(project, idx) {
        const newProjectBtn = document.createElement('button');
        newProjectBtn.classList.add('child');
        newProjectBtn.classList.add('project-btn');
        newProjectBtn.setAttribute('data-index', idx);

        const createProjectBtn = document.querySelector('.create-project-btn');
        const projectsListDiv = document.querySelector('.projects-list');
        projectsListDiv.insertBefore(newProjectBtn, createProjectBtn);

        newProjectBtn.addEventListener('click', DisplayManager.handleClickProjectBtn);
        newProjectBtn.textContent = project.title;
        return newProjectBtn;
    }
     
    return { createSidebarProjectHTML };
});

//managing displaying projects
//projects created outside of here in index
const DisplayManager = (() => {
    let projects = [];
    let defaultProject = new Project('Unsorted');
    const sidebarUI = SidebarUI();
    const contentDiv = document.querySelector('.content');

    function addProject(title) {
        const project = new Project(title);
        projects.push(project);
        sidebarUI.createSidebarProjectHTML(project, projects.length - 1);
        Storage.saveProjectsToStorage(getProjects());

        return project;
    }

    function clearContent() {
        contentDiv.replaceChildren();
    }

    function displayProject(project) {
        clearContent();
        ProjectUI.displayProject(project);
        Storage.saveProjectsToStorage(DisplayManager.getProjects());
    }

    function getProjects() {
        return projects;
    }

    function handleClickProjectBtn(event) {
        const btn = event.target;
        const idx = btn.getAttribute('data-index');
        
        displayProject(getProjects()[idx]);
    }

    function addDefaultProject() {
        projects.push(defaultProject);
        
        const generalBtn = document.querySelector('.general-proj-btn');
        generalBtn.addEventListener('click', () => {
            displayProject(defaultProject);
        });
    }

    function loadProjects() {
        const projectObjs = Storage.getProjectsFromStorage();
        if (!projectObjs) {
            console.log("No proj objs");
            addDefaultProject();
            displayProject(defaultProject);
            return;
        }

        for (const obj of projectObjs) {
            if (obj.title !== 'Unsorted') {
                const project = new Project(obj.title);
                const lists = obj.lists;
                for (const list of lists) {
                    for (const todo of list) {
                        console.log(todo._status);
                        project.createTodoItem(todo.title, todo._status, todo.description, todo._priority, todo._dueDate);
                    }
                }
                getProjects().push(project);
                sidebarUI.createSidebarProjectHTML(project, projects.length - 1);
            }
            else {
                defaultProject = new Project(obj.title);
                const lists = obj.lists;
                for (const list of lists) {
                    for (const todo of list) {
                        console.log(todo._status);
                        defaultProject.createTodoItem(todo.title, todo._status, todo.description, todo._priority, todo._dueDate);
                    }
                }
                addDefaultProject();
            }            
        }

        displayProject(defaultProject);
    }

    return { 
        displayProject, 
        addProject, 
        clearContent, 
        getProjects, 
        handleClickProjectBtn,
        addDefaultProject,
        loadProjects };
    
})();



export { DisplayManager, createElement, SidebarUI };