import { DisplayManager } from "./display-manager";
import { ProjectUI } from "./project-ui";

const CreateTaskModal = (() => {
    function handleClickCreateModal(event) {
        displayModal();
    }

    const dialog = document.querySelector('dialog');

    function displayModal() {
        dialog.className = 'create-task';
        createModalHTML();
        displayProjectList();
        dialog.showModal();
    }

    function createModalHTML() {
        editModalMargin();

        dialog.innerHTML = 
        `        <div class="create-task-container">
            <form action="" method="POST">
                <div class="project-title-container">
                    <label for="project-title">In list</label>
                    <select name="project-title" id="project-title">
                    </select>
                </div>
                <p>
                    <label for="title">Task</label>
                    <textarea name="title" id="title"></textarea>
                </p>
                <button type="submit">Save</button>
            </form>
            
            <button class="cancel">Cancel</button>
        </div>`;
        const cancelBtn = dialog.querySelector('.cancel');
        cancelBtn.addEventListener('click', closeModal);

        const form = dialog.querySelector('form');
        form.addEventListener('submit', saveNewTask);

        const textarea = document.querySelector('dialog textarea');
        textarea.focus();
    }

    function editModalMargin() {
        const createTaskBtn = document.querySelector('.create-task-btn');
        const top = createTaskBtn.getBoundingClientRect().top;
        dialog.style.marginTop = `${top}px`;
    }

    function closeModal() {
        dialog.replaceChildren();
        dialog.style.marginTop = 'auto'; //need to fix
        dialog.className = '';
        dialog.close();
    }

    function displayProjectList() {
        const projectSelect = document.querySelector('dialog #project-title');
        let idx = 0;

        for (const project of DisplayManager.getProjects()) {
            const option = document.createElement('option');
            option.value = project.title;
            option.textContent = project.title;
            option.setAttribute('data-project-index', idx);
            projectSelect.appendChild(option);
            idx++;
        }
    }

    function saveNewTask(event) {
        event.preventDefault()

        const projectSelect = dialog.querySelector('dialog #project-title');
        const selected = projectSelect.options[projectSelect.selectedIndex];

        const formData = new FormData(event.target);
        const projectIdx = selected.getAttribute('data-project-index');
        const project = DisplayManager.getProjects()[projectIdx];
        DisplayManager.displayProject(project);
        ProjectUI.addTodoToProject(formData.get('title'), 'todo');

        closeModal();
    }
    
    return { handleClickCreateModal };
})();

export { CreateTaskModal };