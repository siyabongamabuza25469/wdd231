document.addEventListener('DOMContentLoaded', () => {
  // ---------- Timestamp Field ----------
  const timestampInput = document.getElementById('timestamp');
  if (timestampInput) {
    const now = new Date();
    timestampInput.value = now.toISOString();
  }

  // ---------- Update Last Modified ----------
  const lastModifiedEl = document.getElementById('lastModified');
  if (lastModifiedEl) {
    const lastModDate = new Date(document.lastModified);
    // Format nicely, e.g. "April 7, 2026, 15:30"
    lastModifiedEl.textContent = lastModDate.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // ---------- Modal Functionality ----------
  const modals = document.querySelectorAll('.modal');
  const openers = document.querySelectorAll('.membership-cards a[role="button"][aria-haspopup="dialog"]');
  const closeButtons = document.querySelectorAll('.modal .close-modal');

  // Utility to open a modal by ID
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();

    // Update aria-expanded on corresponding opener
    openers.forEach(opener => {
      if (opener.getAttribute('href') === `#${modalId}`) {
        opener.setAttribute('aria-expanded', 'true');
      }
    });

    // Trap focus inside modal
    trapFocus(modal);
  }

  // Utility to close a modal
  function closeModal(modal) {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');

    // Remove the focus trap listener
    if (modal._handleTrap) {
      modal.removeEventListener('keydown', modal._handleTrap);
      delete modal._handleTrap;
    }

    // Update aria-expanded on corresponding opener and return focus
    openers.forEach(opener => {
      let targetId = opener.getAttribute('href').slice(1);
      if (targetId === modal.id) {
        opener.setAttribute('aria-expanded', 'false');
        opener.focus();
      }
    });
  }

  // Event listeners for open modal links
  openers.forEach(opener => {
    opener.addEventListener('click', e => {
      e.preventDefault();
      const href = opener.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const modalId = href.slice(1);
      openModal(modalId);
    });
    // Also support keyboard Enter/Space triggering (default for <a> is OK)
  });

  // Event listeners for close buttons
  closeButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      // Find closest modal ancestor
      const modal = btn.closest('.modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // Close modal on pressing Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      // Close any open modal
      modals.forEach(modal => {
        if (!modal.hasAttribute('hidden')) {
          closeModal(modal);
        }
      });
    }
  });

  // Modify trapFocus to save handler reference on the element:
  function trapFocus(element) {
    const focusableSelectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type=hidden])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]'
    ];
    const focusableElements = element.querySelectorAll(focusableSelectors.join(','));
    if (focusableElements.length === 0) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    function handleTrap(e) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) { // Shift+Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else { // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }

    element.addEventListener('keydown', handleTrap);

    // Save the handler so we can remove it later
    element._handleTrap = handleTrap;

    // Focus the element to start
    if (element.tabIndex < 0) {
      element.tabIndex = -1;
    }
    element.focus();
  }
});