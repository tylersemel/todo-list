const STATUS = ['todo', 'doing', 'done'];
const PRIORITY = ['NONE', 'IMPORTANT', 'URGENT'];

class TodoItem {
    #status;
    #priority;

    constructor(title, status, description, dueDate, priority, notes, checkList) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.#status = !status ? STATUS[0] : status;
        this.#priority = !priority ? PRIORITY[0] : priority;
        this.notes = notes;
        this.checkList = checkList;
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

    printTodo() {
        console.log('title: ' + this.title + '\n' + 
                    'descript: ' + this.description + '\n' +
                    'due date: ' + this.dueDate + '\n' +
                    'priority: ' + this.#priority + '\n' +
                    'status: ' + this.#status);
    }
}

export { TodoItem, STATUS, PRIORITY };