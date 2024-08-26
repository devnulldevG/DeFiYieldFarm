import axios from 'axios';

const BASE_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const fetchAPIData = async (endpoint) => {
    try {
        const { data } = await axios.get(`${BASE_API_URL}/${endpoint}`);
        return data;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return null;
    }
};

const displayDataInUI = (fetchedData) => {
    const dataContainerElement = document.getElementById('data-container');
    if (fetchedData) {
        dataContainerElement.textContent = JSON.stringify(fetchedData, null, 2);
    } else {
        dataContainerElement.textContent = 'Failed to load data from API';
    }
};

const handleFetchDataButtonClick = async () => {
    const apiData = await fetchAPIData('data');
    displayDataInUI(apiData);
};

const initializeApplication = () => {
    const fetchDataButton = document.getElementById('get-data-btn');
    if(fetchDataButton) {
        fetchDataButton.addEventListener('click', handleFetchDataButtonClick);
    }
};

if(document.readyState === 'loading') {  
    document.addEventListener('DOMContentLoaded', initializeApplication);
} else {  
    initializeApplication();
}