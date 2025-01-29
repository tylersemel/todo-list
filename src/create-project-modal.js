import { Project } from "./project";
import { DisplayManager } from "./display-manager";

const CreateProjectModal = (() => {
    const dialog = document.querySelector('dialog');
    const contentDiv = document.querySelector('.content');

    function displayModal() {
        dialog.classList.add('create-project');
        createModalHTML();
        dialog.showModal();
        editModalMargin();
    }

    function createModalHTML() {
        dialog.innerHTML = 
        `<div class="create-project-container">
            <form action="" method="POST">
                <p>
                    <label for="title">Name</label>
                    <input type="text" id="title" name="title">
                </p>
                <button type="submit">Save</button>
            </form>
            <button class="cancel">Cancel</button>
        </div>`;
        const cancelBtn = dialog.querySelector('.cancel');
        cancelBtn.addEventListener('click', closeModal);

        const form = dialog.querySelector('form');
        form.addEventListener('submit', saveNewProject);
    }

    function editModalMargin() {
        const createProjectsBtn = document.querySelector('.create-project-btn');
        const top = createProjectsBtn.getBoundingClientRect().top;
        dialog.style.marginTop = `${top}px`;
    }

    function closeModal() {
        dialog.close();
    }

    function saveNewProject(event) {
        event.preventDefault()

        const formData = new FormData(event.target);

        const project = new Project(formData.get('title'));
        DisplayManager.addProject(project);
        createSidebarProjectHTML(formData.get('title'));
    }

    function createSidebarProjectHTML(title) {
        const newProjectBtn = document.createElement('button');
        newProjectBtn.classList.add('child');
        newProjectBtn.classList.add('project-btn');
        newProjectBtn.textContent = title;

        const createProjectBtn = document.querySelector('.create-project-btn');
        const projectsListDiv = document.querySelector('.projects-list');
        projectsListDiv.insertBefore(newProjectBtn, createProjectBtn);
    }

    return { displayModal };
})();

export { CreateProjectModal };