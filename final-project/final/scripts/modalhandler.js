// scripts/modalhandler.js

const modal = document.getElementById('info-modal');
const closeButton = modal.querySelector('.modal-close');
const dataSection = document.getElementById('submitted-data'); // For submitted form data
const modalTitle = document.getElementById('modal-title');     // Modal title element

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
 * Show the modal window and set focus
 */
function showModal() {
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    modal.focus();
    document.body.style.overflow = 'hidden';  // prevent background scrolling
}

/**
 * Hide the modal window and restore focus
 */
function hideModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    // Optionally, move focus back to last focused element or container
}

/**
 * Display submitted travel data inside the modal.
 * If data is null or undefined, hide modal.
 * @param {Object} data 
 */
export function displayTravelData(data) {
    if (!data) {
        hideModal();
        return;
    }

    modalTitle.textContent = 'Submitted Travel Information';

    // Clear previous content
    dataSection.innerHTML = '';

    // Heading inside dataSection (optional, redundant with modalTitle maybe)
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

/**
 * Display detailed info about a clicked travel item inside the modal.
 * This updates the modal title and content with item's properties.
 * @param {Object} item - travel item object with keys: name, location, price, duration, description (optional)
 */
export function displayModalWithItemDetails(item) {
    if (!item) {
        hideModal();
        return;
    }

    modalTitle.textContent = item.name || 'Travel Item Details';

    // Clear previous content in dataSection
    dataSection.innerHTML = '';

    // Use a fragment or direct innerHTML to show item details
    const detailsFragment = document.createDocumentFragment();

    // Create a wrapping div or keep simple list
    const ul = document.createElement('ul');

    // Add each property as list items with labels
   ul.appendChild(createListItem('Location', item.location || 'Unknown'));
ul.appendChild(createListItem('Price', typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : (item.price || 'N/A')));
ul.appendChild(createListItem('Duration', item.duration || 'N/A'));

if (item.description) {
    const descLi = document.createElement('li');
    descLi.textContent = `Description: ${item.description}`;
    ul.appendChild(descLi);
}

dataSection.appendChild(ul);

showModal();
}

// Event listener for close button
closeButton.addEventListener('click', hideModal);

// Optional: Close modal when clicking outside modal content
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideModal();
    }
});

// Optional: Close modal on Escape key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        hideModal();
    }
});