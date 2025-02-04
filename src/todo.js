const STATUS = ['todo', 'doing', 'done'];
const PRIORITY = ['none', 'important', 'urgent'];

class Todo {
    #status;
    #priority;

    constructor(title, status, projectIdx, description, dueDate, priority, notes, checkList) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.#status = !status ? STATUS[0] : status;
        this.#priority = !priority ? PRIORITY[0] : priority;
        this.notes = notes;
        this.checkList = checkList;
        this.projectIdx = projectIdx;
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

export { Todo, STATUS, PRIORITY };