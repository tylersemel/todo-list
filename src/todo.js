const STATUS = ['todo', 'doing', 'done'];
const PRIORITY = ['none', 'important', 'urgent'];
import { format, parse } from "date-fns";

class Todo {
    #status;
    #priority;
    #dueDate;

    constructor(title, status, projectIdx, description, priority, notes, checkList) {
        this.title = title;
        this.description = description;
        this.#status = !status ? STATUS[0] : status;
        this.#priority = !priority ? PRIORITY[0] : priority;
        this.notes = notes;
        this.checkList = checkList;
        this.projectIdx = projectIdx;
        this.#dueDate = '';
    }

    get status() {
        return this.#status;
    }

    set status(status) {
        if (STATUS.indexOf(status) === -1) {
            return;
        }
        this.#status = status;
    }

    get priority() {
        return this.#priority;
    }

    set priority(priority) {
        if (PRIORITY.indexOf(priority) === -1) {
            return;
        }
        this.#priority = priority;
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(due) {
        if (!due) {
            this.#dueDate = '';
        }
        else {
            const date = parse(due, 'yyyy-MM-dd', new Date());
            this.#dueDate = format(date, "MMM dd yyyy"); 
        }
        
    }

    printTodo() {
        console.log('title: ' + this.title + '\n' + 
                    'descript: ' + this.description + '\n' +
                    'due date: ' + this.dueDate + '\n' +
                    'priority: ' + this.#priority + '\n' +
                    'status: ' + this.#status);
    }
}

export { Todo, STATUS, PRIORITY };