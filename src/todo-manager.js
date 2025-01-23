const todoItemManager = (function() {
    const STATUS = ['todo', 'doing', 'done'];
    const PRIORITY = ['NONE', 'IMPORTANT', 'URGENT'];

    const createTodoItem = (title, description, dueDate, project, status, priority, notes, checkList) => {
        let projectName = !project ? 'default' : project;
        let _status = STATUS[0];
        let _priority = PRIORITY[0];
        let _checkList = [];
        let _notes = '';

        const setStatus = (status) => {
            if (STATUS.indexOf(status) === -1) {
                // console.log('Not a valid status.');
                return;
            }

            _status = status;
        }

        function setPriority(priority) {
            if (PRIORITY.indexOf(priority) === -1) {
                // console.log('Not a valid priority.');
                return;
            }

            _priority = priority;
        }

        function setChecklist() {
            _checkList = checkList;
        }

        function printTodo() {
            console.log('title: ' + title + '\n' + 
                        'descript: ' + description + '\n' +
                        'due date: ' + dueDate + '\n' +
                        'priority: ' + _priority + '\n' +
                        'project: ' + projectName + '\n' +
                        'status: ' + _status);
        }

        setStatus(status);
        setPriority(priority);
        setChecklist(checkList);
        
        return { 
            title,
            description, 
            dueDate, 
            setPriority, 
            notes, 
            setChecklist,
            getChecklist: function() {
                return _checkList;
            },
            projectName, 
            setStatus,
            getStatus: function() {
                return _status;
            },
            printTodo };
    };

    return { STATUS, PRIORITY, createTodoItem };
})();

export { todoItemManager };