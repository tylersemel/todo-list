import { DisplayManager } from "./display-manager";
import { PRIORITY } from "./todo";
import { format, endOfDay } from "date-fns";

const TodayTasksPageUI = (() => { 
    const contentDiv = document.querySelector('.content');

    function handleClickTodayBtn(event) {
        createPageHTML();
    }

    function createPageHTML() {
        contentDiv.innerHTML = 
        `<h2 class="all-tasks">Tasks Due Today</h2>
            <p class="today">Today's date:</p>
            <div class="tasks-table-container">
                <table class="tasks-table">
                    <tr>
                        <th>Task</th>
                        <th>List</th>
                        <th>Project</th>
                        <th>Priority</th>
                    </tr>
                </table>
            </div>`;
        
        const p = document.querySelector('.today');
        p.textContent += ' ' + format(endOfDay(new Date()), "MMM dd yyyy");
        displayAllTasks();
    }

    function displayAllTasks() {
        const table = document.querySelector('table');

        for (const project of DisplayManager.getProjects()) {
            for (const task of project.getAllTodos()) {
                if (task.dueDate === format(endOfDay(new Date()), "MMM dd yyyy")) {
                    console.log(task.dueDate);
                    const tr = createTaskHTML(task, project);
                    table.appendChild(tr);
                }
                // console.log(task);
                
            }
        }
    }

    function createTaskHTML(task, project) {
        const tr = document.createElement('tr');
        const tdTask = document.createElement('td');
        const tdList = document.createElement('td');
        const tdProject = document.createElement('td');
        const tdPriority = document.createElement('td');

        tr.appendChild(tdTask);
        tr.appendChild(tdList);
        tr.appendChild(tdProject);
        tr.appendChild(tdPriority);

        tdTask.textContent = task.title;
        tdList.textContent = task.status;
        tdProject.textContent = project.title;

        switch (task.priority) {
            case PRIORITY[0]:
                tdPriority.textContent = '';
                tr.style.backgroundColor = 'lightgreen';
                break;
            case PRIORITY[1]:
                tdPriority.textContent = task.priority; 
                tr.style.backgroundColor = 'orange';
                break;
            case PRIORITY[2]:
                tdPriority.textContent = task.priority; 
                tr.style.backgroundColor = 'red';
                break;
        }

        return tr;
    }

    return { handleClickTodayBtn };
})();

export { TodayTasksPageUI };