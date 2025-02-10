import { DisplayManager } from "./display-manager";
import { PRIORITY } from "./todo";
import { format, endOfDay } from "date-fns";

const TodayTasksPageUI = (() => { 
    const contentDiv = document.querySelector('.content');

    function handleClickTodayBtn(event) {
        createPageHTML();
    }

    function createPageHTML() {
        contentDiv.innerHTML = `
            <div class="today-container">
                <div class="today-table-container">
                    <table class="tasks-table">
                        <caption>Tasks for </caption>
                        <tr>
                            <th>Priority</th>
                            <th>Task</th>
                            <th>List</th>
                            <th>Project</th>
                            
                        </tr>
                    </table>
                </div>
            </div>
            `;
        
        const title = document.querySelector('header div');
        title.textContent = 'Tasks Due Today';
        const caption = document.querySelector('caption');
        caption.textContent += ' ' + format(endOfDay(new Date()), "MMM dd, yyyy");
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
        const circleDiv = document.createElement('div');
        tdPriority.appendChild(circleDiv);

        tr.appendChild(tdPriority);
        tr.appendChild(tdTask);
        tr.appendChild(tdList);
        tr.appendChild(tdProject);
        

        tdTask.textContent = task.title;
        tdList.textContent = task.status;
        tdProject.textContent = project.title;

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

    return { handleClickTodayBtn };
})();

export { TodayTasksPageUI };