
import { format, parse } from "date-fns";

class Todo {
    static #id = 0;
    static LIST = ['todo', 'doing', 'done'];
    static PRIORITY = ['none', 'important', 'urgent'];

    static #incrementId() {
        Todo.#id++;
    }

    constructor(title, list, description, priority, dueDate, notes, checkList) {
        Todo.#incrementId();
        this.id = Todo.#id;
        this.title = title;
        this.description = description || '';
        this._list = list || LIST[0];
        this._priority = priority || PRIORITY[0];
        this.notes = notes || '';
        this.checkList = checkList || '';
        this._dueDate = dueDate || '';
    }

    get list() {
        return this._list;
    }

    set list(list) {
        if (LIST.indexOf(list) === -1) {
            return;
        }
        this._list = list;
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
                    'list: ' + this._list);
    }
}

export { Todo };