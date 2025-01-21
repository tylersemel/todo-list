const todoItemManager = (function() {
    const STATUS = ['TO DO', 'DOING', 'DONE'];
    const PRIORITY = ['NONE', 'IMPORTANT', 'URGENT'];

    const createTodoItem = (title, description, dueDate, priority, notes) => {
        let projectName = 'default';
        let status = STATUS[0];
        
        return { title, 
            description, 
            dueDate, 
            priority, 
            notes, 
            projectName, 
            status };
    };

    function setStatus(todo, status) {
        if (!STATUS.find(status)) {
            return "Incorrect status";
        }

        todo.status = status;
    }

    function setPriority(todo, priority) {
        if (!PRIORITY.find(priority)) {
            return "Not a valid priority";
        }

        todo.priority = priority;
    }

    return { createTodoItem, setStatus };
})();

export { todoItemManager };