document.addEventListener('DOMContentLoaded', () => { const modal = document.getElementById('myModal'); const openBtn = document.getElementById('openModalBtn'); const closeBtn = document.querySelector('.close-btn'); const timestampField = document.getElementById('lastModified');

const updateTimestamp = () => {
    timestampField.value = new Date().toISOString();
};
openBtn.addEventListener('click', () => { modal.style.display = 'block'; updateTimestamp(); });

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});
window.addEventListener('click', (event) => { if (event.target === modal) { modal.style.display = 'none'; } }); });