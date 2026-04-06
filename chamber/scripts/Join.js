const buttons = document.querySelectorAll('button[aria-haspopup="dialog"]');
const lastModified = new Date().toISOString();

buttons.forEach(button => {
  const modalId = button.getAttribute('aria-controls');
  const modal = document.getElementById(modalId);
button.addEventListener('click', () => { // Update metadata attributes button.setAttribute('data-last-modified', lastModified); button.setAttribute('name', 'membership-action');

// Programmatically trigger modal
if (typeof modal.showModal === 'function') {
  modal.showModal();
  button.setAttribute('aria-expanded', 'true');
}
}); });

// Logic for closing modals document.querySelectorAll('dialog button').forEach(closeBtn => { closeBtn.addEventListener('click', () => { const modal = closeBtn.closest('dialog'); modal.close(); const triggerBtn = document.querySelector([aria-controls="${modal.id}"]); triggerBtn.setAttribute('aria-expanded', 'false'); }); });