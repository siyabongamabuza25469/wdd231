document.addEventListener('DOMContentLoaded', () => {
  // Set hidden timestamp field to current date-time in ISO format
  const timestampInput = document.getElementById('timestamp');
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }

  // Update the last modified date text in footer
  const lastModifiedSpan = document.getElementById('last-modified');
  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
  }
});

/**
 * Opens a modal dialog by id, updates triggering button's aria-expanded.
 * @param {string} id - The modal dialog element ID.
 * @param {HTMLElement} btn - The button element that opened the modal.
 */
function openModal(id, btn) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.showModal();

  // Update aria-expanded on the button
  if (btn && btn.setAttribute) {
    btn.setAttribute('aria-expanded', 'true');
  }

  // Trap focus inside the dialog — optional but recommended for accessibility
  trapFocus(modal);

  // Close modal on Esc key press
  function escKeyListener(event) {
    if (event.key === 'Escape') {
      closeModal(id, btn);
    }
  }
  modal.addEventListener('keydown', escKeyListener);

  // Remove keydown listener when modal closes
  modal.addEventListener('close', () => {
    modal.removeEventListener('keydown', escKeyListener);
  });
}

/**
 * Closes a modal dialog by id and updates triggering button's aria-expanded.
 * @param {string} id - The modal dialog element ID.
 * @param {string|HTMLElement} btnOrId - The button element or its ID that triggered the modal.
 */
function closeModal(id, btnOrId) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.close();

  // Determine button element
  let btn = null;
  if (typeof btnOrId === 'string') {
    btn = document.getElementById(btnOrId);
  } else {
    btn = btnOrId;
  }

  if (btn && btn.setAttribute) {
    btn.setAttribute('aria-expanded', 'false');
    btn.focus(); // Return focus to button after closing modal
  }
}

/**
 * Optional: Trap keyboard focus inside the dialog for accessibility.
 * @param {HTMLDialogElement} dialog 
 */
function trapFocus(dialog) {
  const focusableSelectors = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"])'
  ];
  const focusableElements = dialog.querySelectorAll(focusableSelectors.join(','));
  if (focusableElements.length === 0) return;

  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length -1];

  function handleFocus(event) {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    }
  }

  dialog.addEventListener('keydown', handleFocus);

  // Focus first focusable element when dialog opens
  firstEl.focus();

  // Cleanup listener on close
  dialog.addEventListener('close', () => {
    dialog.removeEventListener('keydown', handleFocus);
  }, { once: true });
}