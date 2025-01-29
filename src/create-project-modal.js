const CreateProjectModal = (() => {
    const dialog = document.querySelector('dialog');
    const contentDiv = document.querySelector('.content');

    function displayModal() {
        dialog.classList.add('create-project');
        createModalHTML();
        dialog.showModal();
        editModalMargin();
    }

    function createModalHTML() {
        dialog.innerHTML = 
        `<div class="create-project-container">
            <form action="" method="POST">
                <p>
                    <label for="title">Name</label>
                    <input type="text" id="title" name="title">
                </p>
                <button type="submit">Save</button>
            </form>
            <button class="cancel">Cancel</button>
        </div>`;
        const cancelBtn = dialog.querySelector('.cancel');
        cancelBtn.addEventListener('click', closeModal);
    }

    function editModalMargin() {
        const createProjectsBtn = document.querySelector('.create-project-btn');
        const top = createProjectsBtn.getBoundingClientRect().top;
        dialog.style.marginTop = `${top}px`;
    }

    function closeModal() {
        dialog.close();
    }

    return { displayModal };
})();

export { CreateProjectModal };