import { fetchTravelData } from './datafetcher.js';
import { displayTravelData } from './modalhandler.js';

async function init() {
    const data = await fetchTravelData('./travel-items.json');
    displayTravelData(data);
}

init();