// scripts/modalhandler.js

const modal = document.getElementById('info-modal');
const closeButton = modal.querySelector('.modal-close');
const dataSection = document.getElementById('submitted-data');

/**
 * Helper function to create a list item with label and value.
 * @param {string} label 
 * @param {string} value 
 * @returns {HTMLElement} <li> element
 */
function createListItem(label, value) {
    const li = document.createElement('li');
    li.textContent = `${label}: ${value}`;
    return li;
}

/**
 * Helper function to format a date string into a more readable format.
 * Returns original string if invalid date.
 * @param {string} dateStr 
 * @returns {string}
 */
function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    if (!isNaN(dateObj.getTime())) {
        return dateObj.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    return dateStr;
}

/**
 * Display travel data inside modal.
 * If data is null or undefined, hide modal.
 * @param {Object} data 
 */
export function displayTravelData(data) {
    if (!data) {
        hideModal();
        return;
    }

    // Clear previous content
    dataSection.innerHTML = '';

    // Heading
    const heading = document.createElement('h3');
    heading.textContent = 'Submitted Travel Information';
    dataSection.appendChild(heading);

    // Create a list to show travel data
    const ul = document.createElement('ul');

    // Define expected fields and their friendly labels
    const fields = [
        { key: 'name', label: 'Full Name' },
        { key: 'email', label: 'Email Address' },
        { key: 'destination', label: 'Preferred Destination' },
        { key: 'travel_date', label: 'Preferred Travel Date' },
        { key: 'newsletter', label: 'Newsletter Subscription' },
    ];

    fields.forEach(({ key, label }) => {
        let value = data[key];

        if (value !== undefined && value !== null) {
            // Format specific fields
            if (key === 'newsletter') {
                value = value ? 'Subscribed' : 'Not subscribed';
            } else if (key === 'travel_date') {
                value = formatDate(value);
            }
            ul.appendChild(createListItem(label, value));
        }
    });

    dataSection.appendChild(ul);

    showModal();
}

/** Show the modal window */
function showModal() {
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    modal.focus();
    document.body.style.overflow = 'hidden';  // prevent background scrolling
}

/** Hide the modal window */
function hideModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Event listener to close modal on clicking close button
closeButton.addEventListener('click', () => {
    hideModal();
});

// Event listener to close modal on pressing Escape key
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        hideModal();
    }
});