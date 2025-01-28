import { Todo, STATUS } from "./todo.js";

class Project {
    constructor(title) {
        this.title = title;
        this.todoList = [];
        this.doingList = [];
        this.doneList = [];
        this.lists = [this.todoList, this.doingList, this.doneList];
    }

    checkWhichList(status) {
        if (status === STATUS[0]) {
            return this.todoList;
        }
        else if (status === STATUS[1]) {
            return this.doingList;
        }
        else if (status === STATUS[2]) {
            return this.doneList;
        }
    }

    createTodoItem(title, status) {
        let todo = new Todo(title, status);
        let list = this.checkWhichList(todo.status);
        this.addTodoToList(todo, list);
        return todo;
    }

    checkTodoInList(todo, list) {
        return list.indexOf(todo);
    }

    addTodoToList(todo, otherList) {
        for (const list of this.lists) {
            let index = this.checkTodoInList(todo, list);
            if (index !== -1) {
                list.splice(index, 1);
                break;
            }
        }

        otherList.push(todo);
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
