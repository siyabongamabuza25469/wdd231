import { members } from '../data/members.mjs';
const main = document.getElementById('discover-main');
main.innerHTML = '';
members.forEach((member, index) => {  
    const card = document.createElement('article');  
    card.className = 'card';  
    card.style.gridArea = `card${index + 1}`;     
    const title = document.createElement('h2');  
    title.textContent = member.name;  
    card.appendChild(title);  
    const figure = document.createElement('figure');  
    const img = document.createElement('img');  
    img.src = member.image;  
    img.alt = member.alt;  
    img.width = 300;  
    img.height = 200;  
    figure.appendChild(img);  
    card.appendChild(figure);  
    const address = document.createElement('address');  
    address.textContent = member.address;  
    card.appendChild(address);  
    const desc = document.createElement('p');  
    desc.textContent = member.description;  
    card.appendChild(desc);  
    const btn = document.createElement('button');  
    btn.textContent = 'Learn More';  card.appendChild(btn);  
    main.appendChild(card);});
    const lastModifiedEl = document.getElementById('lastModified');
    if (lastModifiedEl) {  
        const lastModDate = new Date(document.lastModified);  
        lastModifiedEl.textContent = `Last Modified: ${lastModDate.toLocaleDateString()} ${lastModDate.toLocaleTimeString()}`;}
        function displayVisitMessage() {  
            const visitMessageEl = document.getElementById('visit-message'); 
            if (!visitMessageEl) return  
            const now = Date.now();  
            const lastVisit = localStorage.getItem('discoverLastVisit');  
            if (!lastVisit) {    
                visitMessageEl.textContent = 'Welcome! Let us know if you have any questions.';  
            } 
            else {    
                const lastVisitTime = parseInt(lastVisit, 10);    
                const millisecondsPerDay = 1000 * 60 * 60 * 24;   
                const diffDays = Math.floor((now - lastVisitTime) / millisecondsPerDay);    
                if (diffDays < 1) {      
                    visitMessageEl.textContent = 'Back so soon! Awesome!';    
                } 
                else if (diffDays === 1) {
                   visitMessageEl.textContent = 'You last visited 1 day ago.';
                } else {
                   visitMessageEl.textContent = `You last visited ${diffDays} days ago.`;
                } }
                localStorage.setItem('discoverLastVisit', now.toString());}
                    displayVisitMessage();