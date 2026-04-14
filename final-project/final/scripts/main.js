// main.js

import { fetchTravelData } from '../dataFetcher.js';
import { displayTravelData } from '../modalHandler.js';

async function init() {
    const data = await fetchTravelData(); // Defaults to ./travelData.json
    displayTravelData(data);
}

document.addEventListener('DOMContentLoaded', init);