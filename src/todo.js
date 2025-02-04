const STATUS = ['todo', 'doing', 'done'];
const PRIORITY = ['none', 'important', 'urgent'];
import { format, parse } from "date-fns";

class Todo {
    // #status;
    // #priority;
    // #dueDate;

    constructor(title, status, projectIdx, description, priority, dueDate, notes, checkList) {
        this.title = title;
        this.description = description || '';
        this._status = status || STATUS[0];
        this._priority = priority || PRIORITY[0];
        this.notes = notes || '';
        this.checkList = checkList || '';
        this.projectIdx = projectIdx || 0;
        this._dueDate = dueDate || '';
    }

    get status() {
        return this._status;
    }

    set status(status) {
        if (STATUS.indexOf(status) === -1) {
            return;
        }
        this._status = status;
    }

    get priority() {
        return this._priority;
    }

    set priority(priority) {
        if (PRIORITY.indexOf(priority) === -1) {
            return;
        }
        this._priority = priority;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(due) {
        if (!due) {
            this._dueDate = '';
        }
        else {
            const date = parse(due, 'yyyy-MM-dd', new Date());
            this._dueDate = format(date, "MMM dd yyyy"); 
        }
        
    }

    printTodo() {
        console.log('title: ' + this.title + '\n' + 
                    'descript: ' + this.description + '\n' +
                    'due date: ' + this._dueDate + '\n' +
                    'priority: ' + this._priority + '\n' +
                    'status: ' + this._status);
    }
}

export { Todo, STATUS, PRIORITY };