import { DisplayManager, createElement } from "./display-manager";
import { ProjectUI } from "./project-ui";
//soley focus on UI of cards, not instantiation of todos or projects
const CardUI = (function() {
    let cards = [];
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
        // cardDiv.addEventListener('click', handleCardClick);
        cardDiv.addEventListener('click', TodoUI.handleClickTodo);
        return cardDiv;
    }

    function handleCardClick(event) {
        let cardDiv = event.target.closest('.card');
        // TodoModalUI.loadModal(cards[cardDiv.getAttribute('data-index')]);
    }

    function addCardToList(cardDiv, list, todo) {
        const listDiv = contentDiv.querySelector(`.${list}`);
        const cardContainerDiv = listDiv.querySelector('.card-container');

        cardContainerDiv.appendChild(cardDiv);
        cardDiv.setAttribute('data-index', cards.length);
        let card = { cardDiv, todo };
        cards.push(card);
    }

    function renderCard(card, todo) {
        card.querySelector('.title').textContent = todo.title;
    }

    function getCards() {
        return cards;
    }

    function deleteCard(card) {
        card.parentNode.removeChild(card);
        cards.splice(cards.indexOf(card), 1);
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

        //create cardDiv
        const cardDiv = createCardHTML();
        const todo = ProjectUI.addTodoToProject(formData.get('title'), listSection.classList[0], cardDiv);
        addCardToList(cardDiv, listSection.classList[0], todo);
        renderCard(cardDiv, todo);
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

        const listDiv = contentDiv.querySelector(`.${list}`);
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
        getCards,
        createPendingCard,
        createCardHTML,
        renderCard,
        addCardToList,
        autoResize
    };
})();

export { CardUI };