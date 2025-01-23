import { createElement } from "./create-element";
import { CardUI } from "./card-UI";

const LoadTodoList = (function() {

});

const LoadDoingList = (function() {

})();

const LoadDoneList = (function() {

})();

const generalPageLoader = (function() {
    const contentDiv = document.querySelector('.content');
    const loadTodoList = LoadTodoList();


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
            btn.addEventListener('click', handleAddTask);
            listSections[i].appendChild(btn);
            listsDiv.appendChild(listSections[i]);
        }

        contentDiv.appendChild(listsDiv)
    }

    function addDummyCards(amt, listClass) {
        const listDiv = contentDiv.querySelector(listClass);
        const cardContainerDiv = listDiv.querySelector('.card-container');

        for (let i = 0; i < amt; i++) {
            let card = CardUI.createCardHTML();
            CardUI.updateTitle(card, 'New title');
            console.log(card);
            cardContainerDiv.appendChild(card);
        }
    }
    
    function handleAddTask(event) {
        console.log("Works?" + event.target.classList[0]);
    }

    function loadPage() {
        loadProjectName('General');
        createHTML();
        addDummyCards(1, '.todo');
        addDummyCards(15, '.doing');
    }

    return { loadPage }
})();

//prob gonna go in a module called card functionality or something


// function addCardMoverButtons() {
//     const listsDiv = contentDiv.querySelector('.lists');
//     const todoSection = listsDiv.querySelector('.todo .card-container');
//     const doingSection = listsDiv.querySelector('.doing .card-container');
//     const doneSection = listsDiv.querySelector('.done .card-container');

//     const todoCards = todoSection.querySelectorAll('.card');
//     const doingCards = doingSection.querySelectorAll('.card');
//     const doneCards = doneSection.querySelectorAll('.card');

//     todoCards.forEach(card => {
//         let btn = createElement('button', 'move-right', '>');
//         btn.addEventListener('click', moveCard);
//         btn.list = '.doing';
//         card.appendChild(btn);
//     });

//     doingCards.forEach(card => {
//         let leftBtn = createElement('button', 'move-left', '<');
//         leftBtn.addEventListener('click', moveCard);
//         leftBtn.list = '.todo';
//         card.appendChild(leftBtn);

//         let rightBtn = createElement('button', 'move-right', '>');
//         rightBtn.addEventListener('click', moveCard);
//         rightBtn.list = '.done';
//         card.appendChild(rightBtn);
//     });

//     doneCards.forEach(card => {
//         let btn = createElement('button', 'move-left', '<');
//         btn.addEventListener('click', moveCard);
//         btn.list = '.done';
//         card.appendChild(btn);
//     });


// }

// function moveCard(event) {
//     console.log('move card right' + event.target.list);
//     const listsDiv = contentDiv.querySelector('.lists');
//     const todoSection = listsDiv.querySelector('.todo .card-container');
//     const doingSection = listsDiv.querySelector('.doing .card-container');
//     const doneSection = listsDiv.querySelector('.done .card-container');

//     switch(event.target.list) {
//         case '.todo':
//             todoSection.appendChild(event.target.parentNode);
//             break;
//         case '.doing':
//             doingSection.appendChild(event.target.parentNode);
//             break;
//         case '.done':
//             doneSection.appendChild(event.target.parentNode);
//             break;
//     }

// }


// let hasPickedUpCard = false;


// function pickupCard() {
//     hasPickedUpCard = true;
//     console.log('mouse down');
//     const hoveringCardDiv = document.createElement('div');
//     document.querySelector('.content').appendChild(hoveringCardDiv);
//     hoveringCardDiv.style.width = '200px';
//     hoveringCardDiv.style.height = '200px';
//     hoveringCardDiv.style.backgroundColor = 'white';
//     hoveringCardDiv.style.position = 'fixed';
    
    

//     document.addEventListener('mousemove', (event) => {
//         if (!hasPickedUpCard) {
//             return;
//         }
//         console.log(event.clientX.transform);

//         let startX = document.querySelector('.card').style.transform;
//         startX = 'translateY('+(event.clientY)+'px)';
//         console.log(startX);
//         hoveringCardDiv.style.transform = startX;

//         //size of sidebar and header
//         hoveringCardDiv.style.transform = 'translateY('+(event.clientY - 80 - 30 - 100)+'px)';
//         hoveringCardDiv.style.transform += 'translateX('+(event.clientX - 230 - 100)+'px)';            
        
//         // const x = event.clientX;
//         // const y = event.clientY;
    
//         // console.log(`X: ${x}, Y: ${y}`);
//     });

// }

// function dropCard() {
//     hasPickedUpCard = false;
//     console.log('mouse up');
// }

export { generalPageLoader };