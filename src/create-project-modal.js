// import { DisplayManager } from "./display-manager";

// //for the modal display and saving only
// const CreateProjectModal = (() => {
//     const dialog = document.querySelector('dialog');

//     function displayModal() {
//         dialog.className = 'create-project';
//         createModalHTML();
//         dialog.showModal();
//     }

//     function createModalHTML() {
//         editModalMargin();

//         dialog.innerHTML = 
//         `<div class="create-project-container">
//             <form action="" method="POST">
//                 <p>
//                     <label for="title">Project Name</label>
//                     <input type="text" id="title" name="title">
//                 </p>
//                 <button type="submit">Save</button>
//             </form>
//             <button class="cancel">Cancel</button>
//         </div>`;
//         const cancelBtn = dialog.querySelector('.cancel');
//         cancelBtn.addEventListener('click', closeModal);

//         const form = dialog.querySelector('form');
//         form.addEventListener('submit', saveNewProject);
//     }

//     function editModalMargin() {
//         const createProjectsBtn = document.querySelector('.create-project-btn');
//         const top = createProjectsBtn.getBoundingClientRect().top;
//         dialog.style.marginTop = `${top}px`;
//     }

//     function closeModal() {
//         dialog.classList.remove('create-project');
//         dialog.replaceChildren();
//         dialog.style.marginTop = '';
//         dialog.className = '';
//         dialog.close();
//     }

//     function saveNewProject(event) {
//         event.preventDefault()

//         const formData = new FormData(event.target);
//         const project = DisplayManager.addProject(formData.get('title'));
//         DisplayManager.displayProject(project);

//         closeModal();
//     }

//     return { displayModal };
// })();

// export { CreateProjectModal };