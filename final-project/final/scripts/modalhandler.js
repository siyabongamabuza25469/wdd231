// scripts/modalHandler.js

const modal = document.getElementById('info-modal');
const closeButton = modal.querySelector('.modal-close');
const dataSection = document.getElementById('submitted-data');

function createListItem(label, value) {
    const li = document.createElement('li');
    li.textContent = `${label}: ${value}`;
    return li;
}

function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    if (!isNaN(dateObj.getTime())) {
        return dateObj.toLocaleDateString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    }
    return dateStr;
}

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

    // List container
    const ul = document.createElement('ul');

    // Define fields we want to show, adapting to data keys
    const fields = [
        { key: 'name', label: 'Full Name' },
        { key: 'email', label: 'Email Address' },
        { key: 'destination', label: 'Preferred Destination' },
        { key: 'travel_date', label: 'Preferred Travel Date' },
        { key: 'newsletter', label: 'Newsletter Subscription' }
    ];

    fields.forEach(({ key, label }) => {
        let value = data[key];
        if (value !== undefined && value !== null) {
            if (key === 'newsletter') {
                value = value ? 'Subscribed' : 'Not subscribed';
            }
            if (key === 'travel_date') {
                value = formatDate(value);
            }
            ul.appendChild(createListItem(label, value));
        }
    });

    dataSection.appendChild(ul);

    showModal();
}

function showModal() {
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    modal.focus();
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Close modal on clicking the close button
closeButton.addEventListener('click', () => {
    hideModal();
});

// Close modal on pressing Escape key
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        hideModal();
    }
});