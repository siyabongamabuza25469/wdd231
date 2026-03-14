document.addEventListener('DOMContentLoaded', () => {
    
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
    if (ogImage) {
        console.log('OG Image URL:', ogImage);
    }

    const fetchMembers = async () => { 
    try { 
        const response = await fetch('members.json'); 
        if (!response.ok) { 
            
            throw new Error(`HTTP error! status: ${response.status}`); 
        } 
        const data = await response.json(); 
        console.log('Members Data:', data); 
    } catch (error) { 
        console.error('Error fetching members:', error.message); 
    } 
};
    const lastModifiedSpan = document.getElementById('last-modified'); 
                if (lastModifiedSpan) { lastModifiedSpan.textContent = document.lastModified; }           
    
fetchMembers();
});

   