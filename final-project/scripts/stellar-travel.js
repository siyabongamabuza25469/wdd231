// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    fetchMembers();
    updateLastModified();
});

// Function to fetch members JSON data and render it
async function fetchMembers() {
    try {
        // Assuming you have a members.json file in the same directory as your HTML or siteplan.js
        const response = await fetch('team-members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        renderMembers(members);
    } catch (error) {
        console.error("Failed to fetch member data:", error);
        const container = document.getElementById('team-members');
        if (container) {
            container.textContent = 'Sorry, we are unable to load the team information at this moment.';
        }
    }
}

// Function to render members to the page
function renderMembers(members) {
    const container = document.getElementById('team-members');
    if (!container || !Array.isArray(members)) return;

    container.innerHTML = ''; // Clear existing content if any

    members.forEach(member => {
        // Create elements for each member's profile
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('team-member');

        const img = document.createElement('img');
        img.src = member.photo || 'images/default-profile.png'; // fallback photo
        img.alt = `${member.name}'s photo`;
        img.width = 150;
        img.height = 150;
        img.loading = 'lazy';

        const name = document.createElement('h3');
        name.textContent = member.name;

        const role = document.createElement('p');
        role.textContent = member.role;

        const bio = document.createElement('p');
        bio.textContent = member.bio;

        // Append child elements
        memberDiv.appendChild(img);
        memberDiv.appendChild(name);
        memberDiv.appendChild(role);
        memberDiv.appendChild(bio);

        container.appendChild(memberDiv);
    });
}

// Optional: Update the "Last Modified" date in the footer
function updateLastModified() {
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
}