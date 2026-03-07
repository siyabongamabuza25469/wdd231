document.addEventListener('DOMContentLoaded', () => {
    
    const menuToggleBtn = document.getElementById("menu-toggle-btn");
    const footerNav = document.getElementById("footerNav");

    if (menuToggleBtn && footerNav) { menuToggleBtn.addEventListener('click', () => { 
        footerNav.classList.toggle('active'); 
        const isExpanded = footerNav.classList.contains('active'); 
        menuToggleBtn.setAttribute('aria-expanded', isExpanded); console.log("Menu toggled:", isExpanded); }); 
    }

    const yearElement = document.getElementById("currentyear"); 
    if (yearElement) { yearElement.textContent = new Date().getFullYear(); 
    }

    const lastModifiedElement = document.getElementById("lastmodified"); 
    if (lastModifiedElement) { lastModifiedElement.textContent = document.lastModified; } });