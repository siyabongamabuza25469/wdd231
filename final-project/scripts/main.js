// Clear, render travel items in #items-container with click & keyboard handlers
function renderTravelItems(items) {
    const container = document.getElementById('items-container');
    container.innerHTML = ''; // Clear previous content

    // Limit to first 15 items if needed, or use all items
    items.slice(0, 15).forEach(item => {
        // Create accessible article element for each travel item
        const itemEl = document.createElement('article');
        itemEl.classList.add('travel-item');
        itemEl.tabIndex = 0; // Make focusable

        // Fill with 4 distinct properties - formatting price to show $ sign
        itemEl.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Location:</strong> ${item.location}</p>
            <p><strong>Price:</strong> $${item.price}</p>
            <p><strong>Duration:</strong> ${item.duration} days</p>
            <button class="details-btn" aria-label="More info about ${item.name}">More Info</button>
        `;

        // Click handler on article itself to open modal with details
        itemEl.addEventListener('click', () => {
            displayModalWithItemDetails(item);
            openModal();
        });

        // Keyboard handler (Enter or Space) on article to open modal
        itemEl.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                displayModalWithItemDetails(item);
                openModal();
            }
        });

        // Also add click handler on the More Info button (stop propagation)
        const detailsBtn = itemEl.querySelector('.details-btn');
        detailsBtn.addEventListener('click', e => {
            e.stopPropagation(); // Prevent bubbling to article click
            displayModalWithItemDetails(item);
            openModal();
        });

        container.appendChild(itemEl);
    });
}