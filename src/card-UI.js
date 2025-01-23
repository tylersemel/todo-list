import { createElement } from "./create-element";
import { CardFormUI } from "./card-form-UI";

const CardUI = (function() {
    let index = 0;

    function updateTitle(card, title) {
        card.querySelector('.title').textContent = title;
    }

    function updateDueDate(card, dueDate) {
        card.querySelector('.due-date').textContent = dueDate;
    }

    function createCardHTML() {
        const cardInfo = createElement('div', 'card-info');
    
        const dueDateDiv = createElement('div', 'due-date', '01-10-2025');
        const hasDescriptDiv = createElement('div', 'has-description');
    
        const symbolsDiv = createElement('div', 'symbols');
        symbolsDiv.appendChild(dueDateDiv);
        symbolsDiv.appendChild(hasDescriptDiv);
    
        const titleDiv = createElement('span', 'title', 'test');
    
        cardInfo.appendChild(titleDiv);
        cardInfo.appendChild(symbolsDiv);

        const cardDiv = createElement('div', 'card');
        cardDiv.appendChild(cardInfo);
        cardDiv.setAttribute('data-index', index)
        cardDiv.addEventListener('click', handleCardClick);

        index++;

        return cardDiv;
    }

    function createCardCopy(card) {
        const copy = createCardHTML();
        copy.updateTitle(card.querySelector('.title').textContent);

        return copy;
    }

    function handleCardClick(event) {
        CardFormUI.showModal();

        // event.target.addEventListener('mousemove', (event) => {
        //     console.log(event.target);
        // })
    }

    function editToHoverCSS(card) {

    }

    function pickUpCard(card) {
        createCardCopy(card);

    }

    return { 
        createCardHTML,
        updateTitle,
        updateDueDate,
        createCardCopy
    };
})();

export { CardUI };