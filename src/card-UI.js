import { createElement } from "./create-element";
import { TodoModalUI } from "./todo-modal-UI";
import { createProject } from "./create-project";
import { TodoItem } from "./todo-item";
//could have cardUImanager and CardUIFactory be different things
//cardmanager would hold list of cards 

const CardUI = (function() {
    let cards = [];
    let project;

    const contentDiv = document.querySelector('.content');

    function updateDivTitle(card, title) {
        card.querySelector('.title').textContent = title;
    }

    function updateDivDueDate(card, dueDate) {
        card.querySelector('.due-date').textContent = dueDate;
    }

    function updateDivPriority(card, priority) {
        card.querySelector('.priority').textContent = priority;
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
        symbolsDiv.appendChild(dueDateDiv);
        symbolsDiv.appendChild(priorityFlag);
        symbolsDiv.appendChild(hasDescriptDiv);
    
        const titleDiv = createElement('span', 'title');
        
        cardInfo.appendChild(titleDiv);
        cardInfo.appendChild(symbolsDiv);

        const cardDiv = createElement('div', 'card');
        cardDiv.appendChild(cardInfo);
        cardDiv.addEventListener('click', handleCardClick);

        return cardDiv;
    }

    function handleCardClick(event) {
        let cardDiv = event.target.closest('.card');
        console.log(cardDiv);
        TodoModalUI.loadModal(cards[cardDiv.getAttribute('data-index')]);
    }

    function addCardToList(cardDiv, todo, list) {
        const listDiv = contentDiv.querySelector(`.${list}`);
        const cardContainerDiv = listDiv.querySelector('.card-container');

        cardContainerDiv.appendChild(cardDiv);
        cardDiv.setAttribute('data-index', cards.length);
        let card = { cardDiv, todo };
        cards.push(card);
    }

    function renderCardInfo(card, todo) {
        console.log(todo.title.length);

        card.querySelector('.title').textContent = todo.title;
    }

    function getCards() {
        return cards;
    }

    function deleteCard(card) {
        card.parentNode.removeChild(card);
        cards.splice(cards.indexOf(card), 1);
    }

    function focusOnCard(card) {
        const textArea = card.querySelector('.title');
        textArea.focus();
    }


    function autoResize(event) {
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
        console.log(event.target.style.height);
    }

    /** PENDING CARD HTML AND FUNCTIONALITY */

    function removePendingCard(listSection) {
        const cardContainer = listSection.querySelector('.card-container');
        const child = cardContainer.querySelector('.new-card');
        cardContainer.removeChild(child);
    }

    function createCardDiv(todo, listSection) {
        const cardDiv = createCardHTML();
        addCardToList(cardDiv, todo, listSection.classList[0]);
        renderCardInfo(cardDiv, todo);
        removePendingCard(listSection);
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

        const todo = event.target.todo;
        todo.title = formData.get('title');
        
        //add data to a new card
        //add that card to the list
        //have the project ui module access that newest card and create a todo in that project

        //create cardDiv
        createCardDiv(todo, listSection);
    }
        
    function handleCancelPendingCard(event) {
        removePendingCard(event.target.closest('.list'));
    }

    function createPendingCard(todo, list) {
        const newCardDiv = createElement('div', 'new-card');

        const newCardForm = createElement('form');
        newCardForm.setAttribute('method', 'POST');
        newCardForm.todo = todo;
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

        const listDiv = contentDiv.querySelector(`.${list}`);
        const cardContainerDiv = listDiv.querySelector('.card-container');

        cardContainerDiv.appendChild(newCardDiv);
        focusOnCard(newCardDiv);
    }

    return { 
        updateDivTitle,
        updateDivDueDate,
        updateDivPriority,
        updateDivDescription,
        getCards,
        createPendingCard,
        project
    };
});



export { CardUI };