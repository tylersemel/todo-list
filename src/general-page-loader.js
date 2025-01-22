const generalPageLoader = (function() {
    const contentDiv = document.querySelector('.content');
    
    function loadProjectName(name) {
        const projectNameH2 = document.createElement('h2');
        projectNameH2.textContent = name;
        projectNameH2.classList.add('project-name');
        contentDiv.appendChild(projectNameH2);
    }

    function createHTML() {
        const listsDiv = createElement('div', 'lists');

        const listSections = [];
        listSections.push(createElement('section', 'todo'));
        listSections.push(createElement('section', 'doing'));
        listSections.push(createElement('section', 'done'));

        for (let i = 0; i < listSections.length; i++) {
            let text = 'To do';
            if (i === 1) text = 'Doing';
            if (i === 2) text = 'Done';

            listSections[i].appendChild(createElement('h3', '', text));
            listSections[i].appendChild(createElement('div', 'card-container'));
            let btn = createElement('button', 'add-task', '+ Add a task');
            btn.addEventListener('click', addTask);
            listSections[i].appendChild(btn);
            listsDiv.appendChild(listSections[i]);
        }

        contentDiv.appendChild(listsDiv)
    }

    function addDummyCards(amt, listClass) {
        const listDiv = contentDiv.querySelector(listClass);
        const cardContainerDiv = listDiv.querySelector('.card-container');

        for (let i = 0; i < amt; i++) {
            let card = createCard();
            console.log(card);
            cardContainerDiv.appendChild(card);
        }
    }
    
    function addTask(event) {
        console.log("Works?" + event.target.classList[0]);
    }

    function loadPage() {
        loadProjectName('General');
        createHTML();
        addDummyCards(1, '.todo');
        addDummyCards(4, '.doing');
    }

    return { loadPage }
})();


//prob gonna go in a module called card functionality or something

function createElement(elem, className, text) {
    const element = document.createElement(elem);
    if (className) element.classList.add(className);
    if (text) element.textContent = text;
    return element;
}

function createCard() {
    const dueDateDiv = createElement('div', 'due-date');
    const hasDescriptDiv = createElement('div', 'has-description');

    const symbolsDiv = createElement('div', 'symbols');
    symbolsDiv.appendChild(dueDateDiv);
    symbolsDiv.appendChild(hasDescriptDiv);

    const titleDiv = createElement('span', 'title');

    const cardDiv = createElement('div', 'card');
    cardDiv.appendChild(titleDiv);
    cardDiv.appendChild(symbolsDiv);
    cardDiv.addEventListener('mousedown', moveCard)

    return cardDiv;
}

function moveCard() {

}

function addCardInfo(task) {

}

export { generalPageLoader };