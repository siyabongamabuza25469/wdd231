// Get the current year using the Date object
const currentYear = new Date().getFullYear(); 
const yearElement = document.getElementById("currentyear");
if (yearElement) {
    yearElement.textContent = currentYear;
}

const lastModifiedElement = document.getElementById("lastmodified"); 
if (lastModifiedElement) { 
    lastModifiedElement.textContent = document.lastModified; 
}