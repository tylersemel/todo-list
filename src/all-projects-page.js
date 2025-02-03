import { DisplayManager } from "./display-manager";


const AllProjectsUI = (() => {
    const contentDiv = document.querySelector('.content');
    
    function handleClickAllProjectsBtn() {
        DisplayManager.clearContent();
        createPageHTML();
    }

    function createPageHTML() {
        contentDiv.innerHTML =
        `<div class="all-projects-page">
                <h2 class="project-name">All Projects</h2>
                <h3>[X] Projects</h3>
                <div class="all-projects-container">
                </div>
            </div>
        </div>`;

        addProjects();
        addProjectAmount();
    }

    function addProjects() {
        const allProjectsPageDiv = document.querySelector('.all-projects-page');
        const allProjectsContainer = document.querySelector('.all-projects-container');

        for (const project of DisplayManager.getProjects()) {
            const projectBtn = createProjectHTML(project);
            allProjectsContainer.appendChild(projectBtn);
            projectBtn.addEventListener('click', DisplayManager.handleClickProjectBtn);
        }

        allProjectsPageDiv.appendChild(allProjectsContainer);
    }

    function addProjectAmount() {
        const h3 = document.querySelector('.all-projects-page h3');
        h3.textContent = `${DisplayManager.getProjects().length} Projects`;
    }
    
    function createProjectHTML(project) {
        const projectBtn = document.createElement('button');
        const projectSpan = document.createElement('span');
        const projectTasks = document.createElement('p');
        const idx = DisplayManager.getProjects().indexOf(project);

        projectBtn.setAttribute('data-index', idx);

        projectBtn.appendChild(projectSpan);
        projectBtn.appendChild(projectTasks);

        projectSpan.textContent = project.title;
        projectTasks.textContent = `${project.getAllTodos().length} Tasks`;
        return projectBtn;
    }

    return { handleClickAllProjectsBtn };
})();

export { AllProjectsUI };