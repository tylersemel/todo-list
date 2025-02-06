// //the cards

// function updateDivTitle(card, title) {
//     card.querySelector('.title').textContent = title;
// }

// function updateDivDueDate(card, dueDate) {
//     const dueDateDiv = card.querySelector('.due-date');
//     if (dueDate) {
//         dueDateDiv.textContent = '📅 ';
//         dueDateDiv.textContent += dueDate; 
//     }
    
// }

// function updateDivPriority(card, priority) {
//     const COLORS = ['green', 'orange', 'red'];
//     const priorityDiv = card.querySelector('.priority');

//     if (priority === PRIORITY[0]) {
//         priorityDiv.textContent = priority;  
//         priorityDiv.style.backgroundColor = COLORS[0];
//     }
//     else if (priority === PRIORITY[1]) {
//         priorityDiv.textContent = priority;  
//         priorityDiv.style.backgroundColor = COLORS[1];
//     }
//     else if (priority === PRIORITY[2]) {
//         priorityDiv.textContent = priority;  
//         priorityDiv.style.backgroundColor = COLORS[2];
//     }
    
// }

// function updateDivDescription(card, hasDescription) {
//     if (hasDescription) {
//         card.querySelector('.has-description').textContent = 'More';
//     }
//     else {
//         card.querySelector('.has-description').textContent = '';
//     }
// }

const createTodoInput = (({title, list}) => {
    //get input from pending card
})();


export const TodoDisplay = (({title, list, }) => {

    function handleClickTodo(event) {
        const cardDiv = event.target.closest('.card');
    
        TodoUI.displayModal(cardDiv);
    }
    
    function setCardAttributes(cardDiv, cardIdx, projectIdx) {
        cardDiv.setAttribute('data-index', cardIdx);
        cardDiv.setAttribute('data-project-idx', projectIdx);
    
    }
    
    function renderCard(card, todo) {
        updateDivTitle(card, todo.title);
        updateDivDescription(card, todo.description);
        updateDivDueDate(card, todo.dueDate);
        updateDivPriority(card, todo.priority);
    }
    
    function createCardHTML() {
        const cardInfo = createElement('div', 'card-info');
    
        const dueDateDiv = createElement('div', 'due-date');
        const priorityFlag = createElement('div', 'priority');
        const hasDescriptDiv = createElement('div', 'has-description');
    
        const symbolsDiv = createElement('div', 'symbols');
        symbolsDiv.appendChild(priorityFlag);
        symbolsDiv.appendChild(dueDateDiv);
        symbolsDiv.appendChild(hasDescriptDiv);
    
        const titleDiv = createElement('span', 'title');
        
        cardInfo.appendChild(titleDiv);
        cardInfo.appendChild(symbolsDiv);
    
        const cardDiv = createElement('div', 'card');
        cardDiv.appendChild(cardInfo);
    
        cardDiv.addEventListener('click', handleClickTodo);
        
        return cardDiv;
    }
})();

export const TodoView = ((todos) => {
    let state = {
        todos: todos,
        project: ""
    };

        
    function createCardHTML() {
        const cardInfo = createElement('div', 'card-info');
    
        const dueDateDiv = createElement('div', 'due-date');
        const priorityFlag = createElement('div', 'priority');
        const hasDescriptDiv = createElement('div', 'has-description');
    
        const symbolsDiv = createElement('div', 'symbols');
        symbolsDiv.appendChild(priorityFlag);
        symbolsDiv.appendChild(dueDateDiv);
        symbolsDiv.appendChild(hasDescriptDiv);
    
        const titleDiv = createElement('span', 'title');
        
        cardInfo.appendChild(titleDiv);
        cardInfo.appendChild(symbolsDiv);
    
        const cardDiv = createElement('div', 'card');
        cardDiv.appendChild(cardInfo);
        
        return cardDiv;
    }

    const element = createCardHTML();
});