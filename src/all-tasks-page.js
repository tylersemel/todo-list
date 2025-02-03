import { DisplayManager } from "./display-manager";

const AllTasksPageUI = (() => {
    const contentDiv = document.querySelector('.content');
    
    function handleClickAllTasksBtn(event) {
        createPageHTML();
    }

    function createPageHTML() {
        contentDiv.innerHTML = 
        `<h2 class="all-tasks">All Tasks</h2>
            <div class="tasks-table-container">
                <table class="tasks-table">
                    <tr>
                        <th>Task</th>
                        <th>List</th>
                        <th>Project</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                    </tr>
                </table>
            </div>`;
        
        displayAllTasks();
    }

    function displayAllTasks() {
        const table = document.querySelector('table');

        for (const project of DisplayManager.getProjects()) {
            for (const task of project.getAllTodos()) {
                console.log(task);
                const tr = createTaskHTML(task, project);
                table.appendChild(tr);
            }
        }
    }

    function createTaskHTML(task, project) {
        const tr = document.createElement('tr');
        const tdTask = document.createElement('td');
        const tdList = document.createElement('td');
        const tdProject = document.createElement('td');
        const tdPriority = document.createElement('td');
        const tdDueDate = document.createElement('td');

        tr.appendChild(tdTask);
        tr.appendChild(tdList);
        tr.appendChild(tdProject);
        tr.appendChild(tdPriority);
        tr.appendChild(tdDueDate);

        tdTask.textContent = task.title;
        tdList.textContent = task.status;
        tdProject.textContent = project.title;
        tdDueDate.textContent = task.dueDate;
        tdPriority.textContent = task.priority;

        return tr;
    }

    return { handleClickAllTasksBtn };

})();

export { AllTasksPageUI };