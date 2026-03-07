document.addEventListener('DOMContentLoaded', () => {    
    const menuToggleBtn = document.getElementById("menu-toggle-btn");
    const footerNav = document.getElementById("footerNav");
    
    if (menuToggleBtn && footerNav) {        
        menuToggleBtn.addEventListener('click', () => {            
            footerNav.classList.toggle('active');            
            const isExpanded = footerNav.classList.contains('active');            
            menuToggleBtn.setAttribute('aria-expanded', isExpanded);

            console.log("Menu toggled:", isExpanded);
}); }
// Set the current year dynamically
const yearElement = document.getElementById("currentyear");
if (yearElement) {
yearElement.textContent = new Date().getFullYear();
}
// Set the last modified date dynamically
const lastModifiedElement = document.getElementById("lastmodified");
if (lastModifiedElement)
lastModifiedElement.textContent = "Last Modified: " + document.lastModified;
});