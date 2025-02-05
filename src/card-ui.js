import { createElement } from "./display-manager";
import { ProjectUI } from "./project-ui";
import { TodoUI } from "./todo-UI";
import { PRIORITY } from "./todo";
import { contentDiv } from "./display-content.js";
//soley focus on UI of cards, not instantiation of todos or projects
const CardUI = (function() {
    const contentDiv = document.querySelector('.content');

    function updateDivTitle(card, title) {
        card.querySelector('.title').textContent = title;
    }

    function updateDivDueDate(card, dueDate) {
        const dueDateDiv = card.querySelector('.due-date');
        if (dueDate) {
            dueDateDiv.textContent = '📅 ';
            dueDateDiv.textContent += dueDate; 
        }
        
    }

    function updateDivPriority(card, priority) {
        const COLORS = ['green', 'orange', 'red'];
        const priorityDiv = card.querySelector('.priority');

        if (priority === PRIORITY[0]) {
            priorityDiv.textContent = priority;  
            priorityDiv.style.backgroundColor = COLORS[0];
        }
        else if (priority === PRIORITY[1]) {
            priorityDiv.textContent = priority;  
            priorityDiv.style.backgroundColor = COLORS[1];
        }
        else if (priority === PRIORITY[2]) {
            priorityDiv.textContent = priority;  
            priorityDiv.style.backgroundColor = COLORS[2];
        }
        
    }

    function updateDivDescription(card, hasDescription) {
        if (hasDescription) {
            card.querySelector('.has-description').textContent = 'More';
        }
        else {
            card.querySelector('.has-description').textContent = '';
        }
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


    function autoResize(event) {
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    }

    /** PENDING CARD HTML AND FUNCTIONALITY */
    function focusOnCard(pendingCard) {
        const textArea = pendingCard.querySelector('.title');
        textArea.focus();
    }

    function removePendingCard(listSection) {
        const cardContainer = listSection.querySelector('.card-container');
        const child = cardContainer.querySelector('.new-card');
        cardContainer.removeChild(child);
    }

    
    //save pending card === save info to the project's given list of todos
    //then close out the pending card and create the finalized card, display that card
    function handleSavePendingCard(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const listSection = event.target.closest('.list');

        //create todo
        if (formData.get('title') === '') {
            removePendingCard(listSection);
            return;
        }

        ProjectUI.addTodoToProject(formData.get('title'), listSection.id);

        removePendingCard(listSection);

        ProjectUI.toggleAddTaskBtns();
    }
        
    function handleCancelPendingCard(event) {
        removePendingCard(event.target.closest('.list'));
        ProjectUI.toggleAddTaskBtns();
    }

    function createPendingCard(list) {
        const newCardDiv = createElement('div', 'new-card');

        const newCardForm = createElement('form');
        newCardForm.setAttribute('method', 'POST');
        newCardForm.addEventListener('submit', handleSavePendingCard);

        const titleTextArea = createElement('textarea', 'title');
        titleTextArea.setAttribute('name', 'title');
        titleTextArea.addEventListener('input', autoResize)

        const saveBtn = createElement('button', 'save', 'ᯓ➤');
        saveBtn.setAttribute('title', 'Save');
        saveBtn.setAttribute('type', 'submit');

        titleTextArea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveBtn.click();
            }
        });

        newCardForm.appendChild(titleTextArea);
        newCardForm.appendChild(saveBtn);
        newCardDiv.appendChild(newCardForm);

        const cancelBtn = createElement('button', 'cancel', '✖');
        cancelBtn.setAttribute('title', 'Cancel');
        cancelBtn.addEventListener('click', handleCancelPendingCard);
        newCardDiv.appendChild(cancelBtn);

        const listDiv = contentDiv.querySelector(`#${list}`);
        const cardContainerDiv = listDiv.querySelector('.card-container');

        cardContainerDiv.appendChild(newCardDiv);
        focusOnCard(newCardDiv);
        return newCardDiv;
    }

    return { 
        updateDivTitle,
        updateDivDueDate,
        updateDivPriority,
        updateDivDescription,
        createPendingCard,
        createCardHTML,
        renderCard,
        setCardAttributes,
        autoResize
    };
})();


/** PENDING CARD HTML AND FUNCTIONALITY */
function focusOnCard(pendingCard) {
    const textArea = pendingCard.querySelector('.title');
    textArea.focus();
}

function removePendingCard(listSection) {
    const cardContainer = listSection.querySelector('.card-container');
    const child = cardContainer.querySelector('.new-card');
    cardContainer.removeChild(child);
}

//save pending card === save info to the project's given list of todos
//then close out the pending card and create the finalized card, display that card
function handleSavePendingCard(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const listSection = event.target.closest('.list');

    //create todo
    if (formData.get('title') === '') {
        removePendingCard(listSection);
        return;
    }

    

    // ProjectUI.addTodoToProject(formData.get('title'), listSection.id);
    //change to event
    const addTodoEvent = new CustomEvent('savePendingCard', {
        detail: {
            title: formData.get('title'),
            list: listSection.id
        }});
    document.dispatchEvent(addTodoEvent);

    removePendingCard(listSection);

    toggleAddTaskBtns();
}

function test() {
    console.log("i am testing");
}

export function toggleAddTaskBtns() {
    const addTaskBtns = contentDiv.querySelectorAll('.add-task');

    for (const addTaskBtn of addTaskBtns) {
        addTaskBtn.disabled = !addTaskBtn.disabled;
        addTaskBtn.classList.toggle('disabled');
    }   
}
    
function handleCancelPendingCard(event) {
    removePendingCard(event.target.closest('.list'));
    toggleAddTaskBtns();
}

export function createPendingCard(list) {
    toggleAddTaskBtns();

    const newCardDiv = createElement('div', 'new-card');

    const newCardForm = createElement('form');
    newCardForm.setAttribute('method', 'POST');
    newCardForm.addEventListener('submit', handleSavePendingCard);

    const titleTextArea = createElement('textarea', 'title');
    titleTextArea.setAttribute('name', 'title');
    // titleTextArea.addEventListener('input', autoResize);

    const saveBtn = createElement('button', 'save', 'ᯓ➤');
    saveBtn.setAttribute('title', 'Save');
    saveBtn.setAttribute('type', 'submit');

    titleTextArea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (titleTextArea.textContent !== '') {
                saveBtn.click();
            }
        }
    });

    newCardForm.appendChild(titleTextArea);
    newCardForm.appendChild(saveBtn);
    newCardDiv.appendChild(newCardForm);

    const cancelBtn = createElement('button', 'cancel', '✖');
    cancelBtn.setAttribute('title', 'Cancel');
    cancelBtn.addEventListener('click', handleCancelPendingCard);
    newCardDiv.appendChild(cancelBtn);

    const listDiv = contentDiv.querySelector(`#${list}`);
    const cardContainerDiv = listDiv.querySelector('.card-container');

    cardContainerDiv.appendChild(newCardDiv);
    focusOnCard(newCardDiv);
    return newCardDiv;
}

export { CardUI };