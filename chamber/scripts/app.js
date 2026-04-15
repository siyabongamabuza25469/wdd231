// app.js (application logic)
// Import data from members module
import { members } from './data/members.mjs';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Handle last visit date & message
  const visitMessage = document.getElementById('visit-message');
  const now = new Date();
  const lastVisit = localStorage.getItem('lastVisit');

  if (lastVisit) {
    const lastDate = new Date(lastVisit);
    const diffTime = Math.abs(now - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else if (diffDays === 1) {
      visitMessage.textContent = `Back so soon! Awesome!`;
    } else {
      visitMessage.textContent = `Welcome back! Your last visit was ${diffDays} days ago.`;
    }
  } else {
    visitMessage.textContent = "Welcome! This is your first visit.";
  }

  localStorage.setItem('lastVisit', now.toISOString());

  // 2. Render members cards with lazy loading images in 3 different named grid layouts
  // We'll create 3 sections representing the 3 layouts:
  //     .layout-one, .layout-two, .layout-three
  // and append the cards accordingly.
  // For demonstration, divide the 8 members roughly as:
  // layout-one: first 3 members
  // layout-two: next 3 members
  // layout-three: last 2 members

  const layoutOne = document.querySelector('.layout-one');
  const layoutTwo = document.querySelector('.layout-two');
  const layoutThree = document.querySelector('.layout-three');

  // Helper function to create a card element for a member
  function createMemberCard(member) {
    const card = document.createElement('article');
    card.className = 'member-card';
    card.setAttribute('tabindex', '0'); // For keyboard navigation (wayfinding)

    // Add named grid area based on membership level to illustrate usage
    card.style.gridArea = member.name.toLowerCase().replace(/\s+/g, '-');

    card.innerHTML = `
      <img src="${member.image}" alt="${member.alt}" loading="lazy" width="300" height="200" />
      <h3>${member.name}</h3>
      <p><strong>Membership:</strong> ${member.membership}</p>
      <p class="description">${member.description}</p>
      <address>${member.address}</address>
    `;

    return card;
  }

  // Append cards to respective layouts
  members.forEach((member, i) => {
    const card = createMemberCard(member);

    if (i < 3) {
      layoutOne.appendChild(card);
    } else if (i < 6) {
      layoutTwo.appendChild(card);
    } else {
      layoutThree.appendChild(card);
    }
  });

  // 3. Responsive navigation menu toggle functionality & wayfinding
  const navToggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('primary-navigation');

  navToggleBtn.addEventListener('click', () => {
    const expanded = navToggleBtn.getAttribute('aria-expanded') === 'true' || false;
    navToggleBtn.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('open');
  });

  // Wayfinding: add keyboard focus styles to nav links
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('focus', () => link.classList.add('focus-visible'));
    link.addEventListener('blur', () => link.classList.remove('focus-visible'));
  });
});