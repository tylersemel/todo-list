import { Todo, LIST } from "./todo.js";

class Project {
    static #id = 0;

    static #incrementId() {
        this.#id++;
    }

    constructor(title, todos) {
        Project.#incrementId();
        this.id = Project.#id;
        this.title = title;
        this.todos = todos;


        this.todoList = [];
        this.doingList = [];
        this.doneList = [];
        this.lists = [this.todoList, this.doingList, this.doneList];
    }

    checkWhichList(list) {
        if (list === LIST[0]) {
            return this.todoList;
        }
        else if (list === LIST[1]) {
            return this.doingList;
        }
        else if (list === LIST[2]) {
            return this.doneList;
        }
    }

    static createTodo(title, list, description, priority, dueDate, notes, checkList) {
        let todo = new Todo(title, list, description, priority, dueDate, notes, checkList);
        let _list = this.checkWhichList(todo.list);
        this.addTodoToList(todo, _list);
        return todo;
    }

    checkTodoInList(todo, list) {
        return list.indexOf(todo);
    }

    addTodoToList(todo, otherList) {
        this.removeTodo(todo);

        otherList.push(todo);
    }

    removeTodo(todo) {
        for (const list of this.lists) {
            let index = this.checkTodoInList(todo, list);
            if (index !== -1) {
                list.splice(index, 1);
                break;
            }
        }
    }

    getTodoFromList(whichList, idx) {
        const list = this.checkWhichList(whichList);
        return list[idx];
    }

    getAllTodos() {
        let allTodos = [];

        for (const list of this.lists) {
            for (const todo of list) {
                allTodos.push(todo);
            }
        }

        return allTodos;
    }

    //for debugging
    printAllTodos() {
        let todos = this.getAllTodos();

        for (const todo of todos) {
            todo.printTodo();
        }
    }
}

export { Project }
