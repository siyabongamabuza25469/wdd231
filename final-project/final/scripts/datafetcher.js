// dataFetcher.js
export async function fetchTravelData(url = './travel-items.json') {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch travel data:', error);
        return null;
    }
}