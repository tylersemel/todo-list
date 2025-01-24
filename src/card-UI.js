import { createElement } from "./create-element";
import { TodoModalUI } from "./todo-modal-UI";
import { todoItemManager } from "./todo-manager";

//could have cardUImanager and CardUIFactory be different things
//cardmanager would hold list of cards 

const CardUI = (function() {
    let index = 0;
    //cards with contain a list of objects 
    // object = { div, todo }
    let cards = [];

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

    function createCardCopy(card) {
        const copy = createCardHTML();
        copy.updateTitle(card.querySelector('.title').textContent);

        //Object.assign ?

        return copy;
    }

    function handleCardClick(event) {
        //have to wait in order to load modal
        let hasLoaded = false;
        while (!hasLoaded) {
            hasLoaded = TodoModalUI.loadModal(cards[event.target.getAttribute('data-index')]);
        }
    }

    function editToHoverCSS(card) {

    }

    function pickUpCard(card) {
        createCardCopy(card);

    }

    function addCardToList(cardDiv, todo, list) {
        const listDiv = contentDiv.querySelector(`.${list}`);
        const cardContainerDiv = listDiv.querySelector('.card-container');

        cardContainerDiv.appendChild(cardDiv);
        cardDiv.setAttribute('data-index', cards.length);
        let card = { cardDiv, todo };
        cards.push(card);

        // return card;
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

    function removeCardForm(listSection) {
        const cardContainer = listSection.querySelector('.card-container');
        const child = cardContainer.querySelector('.new-card');
        cardContainer.removeChild(child);
    }

    function handleSaveCard(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const listSection = event.target.closest('.list');

        //create todo
        if (formData.get('title') === '') {
            removeCardForm(listSection);
            return;
        }
        const todo = todoItemManager.createTodoItem(formData.get('title'));
        todo.setStatus(listSection.classList[0]);
        console.log(formData.get('title'));
        
        //create cardDiv
        const cardDiv = createCardHTML();
        addCardToList(cardDiv, todo, listSection.classList[0]);

        renderCardInfo(cardDiv, todo);

        removeCardForm(listSection);
    }

    function handleCancelCard(event) {
        removeCardForm(event.target.closest('.list'));
    }

    function autoResize(event) {
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
        console.log(event.target.style.height);
    }

    function createCardForm(list) {
        const newCardDiv = createElement('div', 'new-card');

        const newCardForm = createElement('form');
        newCardForm.setAttribute('method', 'POST');
        newCardForm.addEventListener('submit', handleSaveCard);

        const titleTextArea = createElement('textarea', 'title');
        titleTextArea.setAttribute('name', 'title');
        titleTextArea.addEventListener('input', autoResize)

        const saveBtn = createElement('button', 'save', 'Save');
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

        const cancelBtn = createElement('button', 'cancel', 'X');
        cancelBtn.addEventListener('click', handleCancelCard);
        newCardDiv.appendChild(cancelBtn);

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