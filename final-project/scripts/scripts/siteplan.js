document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members-container');
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    let membersData = []; 
    let currentView = 'grid';

    function renderMembers(members, view) {
        if (!members || members.length === 0) {
            membersContainer.innerHTML = 'No members found.';
            return;
        }

members.forEach(member => { 
    const memberDiv = document.createElement('div'); 
    memberDiv.className = 'member-item'; 
    
    memberDiv.innerHTML = `<h2>${member.name}</h2> <p>Role: ${member.role}</p>`; 
    membersContainer.appendChild(memberDiv); 
});

if (listViewBtn) { listViewBtn.addEventListener('click', () => { currentView = 'list'; renderMembers(membersData, currentView); }); }

const fetchMembers = async () => { 
  try { 
    const response = await fetch('members.json'); 
    if (!response.ok) { 
      
      throw new Error(`HTTP error! status: ${response.status}`); 
    } 
    membersData = await response.json(); 
    renderMembers(membersData, currentView); 
  } catch (error) { 
    console.error('Failed to fetch members:', error); 
    membersContainer.innerHTML = 'Error loading members.'; 
  } 
};

gridViewBtn.addEventListener('click', () => { currentView = 'grid'; renderMembers(membersData, currentView); });

listViewBtn.addEventListener('click', () => { currentView = 'list'; renderMembers(membersData, currentView); });

try {
    
} catch (error) {
    console.error('Error fetching members:', error.message);
    membersContainer.innerHTML = `<p class="error">Failed to load members data.</p>`;
}

const createListItem = member => {
  return `
    <article class="member-list-item" tabindex="0">
      <h2>${member.companyName}</h2>
      <p>${member.companyAddress}</p>
      <p><a href="tel:${member.companyPhoneNumber}">${member.companyPhoneNumber}</a></p>
      <p><a href="${member.companyWebsite}" target="_blank" rel="noopener">${member.companyWebsite}</a></p>
      <p class="membership-level">Membership Level: ${member.membershipLevel}</p>
      <p>${member.otherInfo || ''}</p>
    </article>
  `;
};

 let html = ''; if (view === 'grid') { membersContainer.classList.replace('list-view', 'grid-view'); html = members.map(member => createGridItem(member)).join(''); } else { membersContainer.classList.replace('grid-view', 'list-view'); html = members.map(member => createListItem(member)).join(''); } membersContainer.innerHTML = html; }

const lastModifiedSpan = document.getElementById('last-modified');
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}

fetchMembers();
});
