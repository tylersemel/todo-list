import { createElement } from "./create-element";
import { CardFormUI } from "./card-form-UI";
import { todoItemManager } from "./todo-manager";

//could have cardUImanager and CardUIFactory be different things
//cardmanager would hold list of cards 

const CardUI = (function() {
    let index = 0;
    //cards with contain a list of objects 
    // object = { div, todo }
    let cards = [];
    let newCardForm;

    const contentDiv = document.querySelector('.content');

    function updateTitle(card, title) {
        card.querySelector('.title').textContent = title;
    }

    function updateDueDate(card, dueDate) {
        card.querySelector('.due-date').textContent = dueDate;
    }

    function createCardHTML() {
        const cardInfo = createElement('div', 'card-info');
    
        const dueDateDiv = createElement('div', 'due-date');
        const hasDescriptDiv = createElement('div', 'has-description');
    
        const symbolsDiv = createElement('div', 'symbols');
        symbolsDiv.appendChild(dueDateDiv);
        symbolsDiv.appendChild(hasDescriptDiv);
    
        const titleDiv = createElement('span', 'title');
    
        cardInfo.appendChild(titleDiv);
        cardInfo.appendChild(symbolsDiv);

        const cardDiv = createElement('div', 'card');
        cardDiv.appendChild(cardInfo);
        cardDiv.addEventListener('click', handleCardClick);

        return cardDiv;
    }

    function createCardCopy(card) {
        const copy = createCardHTML();
        copy.updateTitle(card.querySelector('.title').textContent);

        //Object.assign ?

        return copy;
    }

    function handleCardClick(event) {
        CardFormUI.showModal();
    }

    function editToHoverCSS(card) {

    }

    function pickUpCard(card) {
        createCardCopy(card);

    }

    function addCardToList(card, list) {
        const listDiv = contentDiv.querySelector(`.${list}`);
        const cardContainerDiv = listDiv.querySelector('.card-container');

        cardContainerDiv.appendChild(card);
        cards.push(card);

        // return card;
    }

    function renderCardInfo(card, todo) {
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

    function removeCardForm(listDiv) {
        const cardContainer = listDiv.querySelector('.card-container');
        cardContainer.removeChild(cardContainer.querySelector('.new-card'));
    }

    function handleSaveCard(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const listDiv = event.target.closest('.list');

        //create todo
        const todo = todoItemManager.createTodoItem(formData.get('title'));
        todo.setStatus(listDiv.classList[0]);
        console.log(todo.title);
        
        //create cardDiv
        const cardDiv = createCardHTML();
        addCardToList(cardDiv, listDiv.classList[0]);

        renderCardInfo(cardDiv, todo);

        removeCardForm(listDiv);
    }

    function createCardForm(list) {
        const newCardDiv = createElement('div', 'new-card');

        const newCardForm = createElement('form');
        newCardForm.setAttribute('method', 'POST');
        newCardForm.addEventListener('submit', handleSaveCard);

        const titleTextArea = createElement('textarea', 'title');
        titleTextArea.setAttribute('name', 'title');

        const saveBtn = createElement('button', 'save', 'Save');
        saveBtn.setAttribute('type', 'submit');

        newCardForm.appendChild(titleTextArea);
        newCardForm.appendChild(saveBtn);
        newCardDiv.appendChild(newCardForm);

        const listDiv = contentDiv.querySelector(`.${list}`);
        const cardContainerDiv = listDiv.querySelector('.card-container');

        cardContainerDiv.appendChild(newCardDiv);
        focusOnCard(newCardDiv);
    }

    return { 
        createCardHTML,
        updateTitle,
        updateDueDate,
        createCardCopy,
        deleteCard,
        addCardToList,
        getCards,
        createCardForm
    };
})();



export { CardUI };