import { fetchTravelData } from './datafetcher.js';
import { displayTravelData } from './modalhandler.js';

async function init() {
    const data = await fetchTravelData(); // Defaults to ./travelData.json
    displayTravelData(data);
}

document.addEventListener('DOMContentLoaded', init); 