import { DisplayManager } from "./display-manager";
import { PRIORITY } from "./todo";

const AllTasksPageUI = (() => {
    const contentDiv = document.querySelector('.content');
    
    function handleClickAllTasksBtn(event) {
        createPageHTML();
    }

    function createPageHTML() {
        contentDiv.innerHTML = 
        `<div class="tasks-table-container">
            <table class="tasks-table">
                <tr>
                    <th>Priority</th>
                    <th>Task</th>
                    <th>List</th>
                    <th>Project</th>
                    <th>Due Date</th>
                </tr>
            </table>
        </div>`;
        
        const title = document.querySelector('header div');
        title.textContent = 'All Tasks';
        displayAllTasks();
    }

    function displayAllTasks() {
        const table = document.querySelector('table');
        const tbody = table.querySelector('tbody');
        for (const project of DisplayManager.getProjects()) {
            for (const task of project.getAllTodos()) {
                console.log(task);
                const tr = createTaskHTML(task, project);
                tbody.appendChild(tr);
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
        const circleDiv = document.createElement('div');
        tdPriority.appendChild(circleDiv);

        tr.appendChild(tdPriority);
        tr.appendChild(tdTask);
        tr.appendChild(tdList);
        tr.appendChild(tdProject);
        
        tr.appendChild(tdDueDate);

        tdTask.textContent = task.title;
        tdList.textContent = task.status;
        tdProject.textContent = project.title;
        tdDueDate.textContent = task.dueDate;

        const COLORS = ['green', '#d9c551', '#d95151'];

        switch (task.priority) {
            case PRIORITY[0]:
                tdPriority.textContent = '';
                break;
            case PRIORITY[1]:
                circleDiv.textContent = 'Important'; 
                circleDiv.style.backgroundColor = COLORS[1];
                circleDiv.style.borderRadius = '5px';
                break;
            case PRIORITY[2]:
                circleDiv.textContent = 'Urgent'; 
                circleDiv.style.backgroundColor = COLORS[2];
                circleDiv.style.borderRadius = '5px';
                break;
        }

        return tr;
    }

    return { handleClickAllTasksBtn };

})();

export { AllTasksPageUI };