// Get the current year
const currentYear = new Date().getFullYear();
// Select the footer paragraph for the current year and set its content
document.getElementById('currentYear').textContent = currentYear;

// Get the last modified date of the document
const lastModifiedDate = document.lastModified;
// Select the footer paragraph for the last modified date and set its content
document.getElementById('lastModified').textContent = `This document was last modified on: ${lastModifiedDate}`;